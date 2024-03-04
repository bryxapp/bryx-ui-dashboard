import Konva from "konva";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, ShapeObj, TextFieldObj, TextInputObj, TextTableObj } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";
import { drawBorders } from "./konvaExtensionUtils";
import { loadImage } from "./canvasUtils";

export function generateShapeId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 4;
    let id = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars.charAt(randomIndex);
    }

    return id;
}

export async function AddShapesToLayer(canvasDesign: CanvasDesignData, fieldValues: EstimateFormFields, layer: Konva.Layer) {
    for (const shape of canvasDesign.Shapes) {
        let konvaShape: Konva.Group | Konva.Shape = new Konva.Group();
        switch (shape.type) {
            case 'Rectangle':
                const rectangle = shape as RectangleObj;
                konvaShape = new Konva.Rect({
                    x: rectangle.x,
                    y: rectangle.y,
                    width: rectangle.width,
                    height: rectangle.height,
                    fill: rectangle.fill,
                    stroke: rectangle.stroke,
                    strokeWidth: rectangle.strokeWidth,
                    rotation: rectangle.rotation,
                });
                break;
            case 'RoundedRectangle':
                const roundedRectangle = shape as RectangleObj;
                konvaShape = new Konva.Rect({
                    x: roundedRectangle.x,
                    y: roundedRectangle.y,
                    width: roundedRectangle.width,
                    height: roundedRectangle.height,
                    fill: roundedRectangle.fill,
                    stroke: roundedRectangle.stroke,
                    strokeWidth: roundedRectangle.strokeWidth,
                    cornerRadius: roundedRectangle.cornerRadius,
                    rotation: roundedRectangle.rotation,
                });
                break;
            case 'Ellipse':
                const ellipse = shape as EllipseObj;
                konvaShape = new Konva.Ellipse({
                    x: ellipse.x,
                    y: ellipse.y,
                    radiusX: ellipse.radiusX,
                    radiusY: ellipse.radiusY,
                    fill: ellipse.fill,
                    stroke: ellipse.stroke,
                    strokeWidth: ellipse.strokeWidth,
                    rotation: ellipse.rotation,
                });
                break;
            case 'Line':
                const line = shape as LineObj;
                konvaShape = new Konva.Line({
                    x: line.x,
                    y: line.y,
                    points: line.points,
                    stroke: line.stroke,
                    strokeWidth: line.strokeWidth,
                    rotation: line.rotation,
                });
                break;
            case 'TextInput':
                const textInput = shape as TextInputObj;
                if (textInput.format === "currency") {
                    fieldValues[textInput.id] = "$" + fieldValues[textInput.id];
                }

                // Create a Konva.Text object for placeholder to calculate its width and height
                const placeholderText = new Konva.Text({
                    text: textInput.displayName,
                    fontSize: textInput.fontSize,
                    fontFamily: textInput.fontFamily,
                    fontStyle: textInput.fontStyle,
                    textDecoration: textInput.textDecoration,
                    align: textInput.align
                });

                const isParagraph = textInput.format === 'paragraph';
                //const containerWidth = isParagraph ? textInput.fontSize * 15 : textInput.fontSize * 10;
                const containerHeight = isParagraph ? textInput.fontSize * 4 : textInput.fontSize * 2;

                // Calculate the position to center the text within the TextInput shape
                //const x =  + (containerWidth - placeholderText.width()) / 2;
                const centered_y = textInput.y + (containerHeight - placeholderText.height()) / 2;

                konvaShape = new Konva.Text({
                    x: textInput.x,
                    y: centered_y,
                    text: fieldValues[textInput.id],
                    fontSize: textInput.fontSize,
                    fill: textInput.fill,
                    rotation: textInput.rotation,
                    fontFamily: textInput.fontFamily,
                    fontStyle: textInput.fontStyle,
                    textDecoration: textInput.textDecoration,
                    align: textInput.align
                });
                break;
            case 'TextField':
                const textField = shape as TextFieldObj;
                konvaShape = new Konva.Text({
                    x: textField.x,
                    y: textField.y,
                    text: textField.value,
                    fontSize: textField.fontSize,
                    fill: textField.fill,
                    rotation: textField.rotation,
                    fontFamily: textField.fontFamily,
                    fontStyle: textField.fontStyle,
                    textDecoration: textField.textDecoration,
                    align: textField.align
                });
                break;
            case 'TextTable':
                const textTable = shape as TextTableObj;
                const textTableGroup = new Konva.Group({
                    x: textTable.x,
                    y: textTable.y
                });

                //Calculate total table width based on individual cell widths
                const tableWidth = textTable.rows[0].reduce((acc, cell) => acc + cell.width, 0);
                //Calculate total table height based on individual cell heights
                const tableHeight = textTable.rows.reduce((acc, row) => acc + row[0].height, 0);
                const tableRect = new Konva.Rect({
                    width: tableWidth,
                    height: tableHeight,
                    stroke: textTable.border ? textTable.border.color : '',
                    strokeWidth: textTable.border ? textTable.border.width : 0,
                });
                textTableGroup.add(tableRect);

                const borderProps = drawBorders(textTable);
                // Iterate over the border properties to create and add lines to the layer
                borderProps.forEach(border => {
                    const line = new Konva.Line({
                        points: border.points,
                        stroke: border.stroke,
                        strokeWidth: border.strokeWidth,
                    });
                    textTableGroup.add(line);
                });

                for (const [rowIndex, row] of textTable.rows.entries()) {
                    for (const [cellIndex, cell] of row.entries()) {
                        // Calculate the X position of the cell based on the widths of all previous cells in the row
                        const cellX = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
                        // Calculate the Y position of the cell based on the heights of all rows above the current row
                        const cellY = textTable.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);

                        if (cell.content?.type === "TextField") {
                            const textField = cell.content as TextFieldObj;
                            const cellText = new Konva.Text({
                                x: cellX,
                                y: cellY,
                                text: textField.value,
                                fontSize: textField.fontSize,
                                fill: textField.fill,
                                rotation: textField.rotation,
                                fontFamily: textField.fontFamily,
                                fontStyle: textField.fontStyle,
                                textDecoration: textField.textDecoration,
                                align: textField.align
                            });
                            textTableGroup.add(cellText);
                        }
                        else if (cell.content?.type === "TextInput") {
                            const textInput = cell.content as TextInputObj;
                            if (textInput.format === "currency") {
                                fieldValues[textInput.id] = "$" + fieldValues[textInput.id];
                            }

                            // Create a Konva.Text object for placeholder to calculate its width and height
                            const placeholderText = new Konva.Text({
                                text: textInput.displayName,
                                fontSize: textInput.fontSize,
                                fontFamily: textInput.fontFamily,
                                fontStyle: textInput.fontStyle,
                                textDecoration: textInput.textDecoration,
                                align: textInput.align
                            });

                            const isParagraph = textInput.format === 'paragraph';
                            //const containerWidth = isParagraph ? textInput.fontSize * 15 : textInput.fontSize * 10;
                            const containerHeight = isParagraph ? textInput.fontSize * 4 : textInput.fontSize * 2;

                            // Calculate the position to center the text within the TextInput shape
                            //const x =  + (containerWidth - placeholderText.width()) / 2;
                            const centeredY = cellY + (containerHeight - placeholderText.height()) / 2;

                            const cellText = new Konva.Text({
                                x: cellX + 5,
                                y: centeredY + 5,
                                text: fieldValues[textInput.id],
                                fontSize: textInput.fontSize,
                                fill: textInput.fill,
                                rotation: textInput.rotation,
                                fontFamily: textInput.fontFamily,
                                fontStyle: textInput.fontStyle,
                                textDecoration: textInput.textDecoration,
                                align: textInput.align
                            });
                            textTableGroup.add(cellText);
                        }
                    }
                }
                layer.add(textTableGroup);
                break;
            case 'Image':
                const imageObj = shape as ImageObj;
                const image = await loadImage(imageObj.src);
                konvaShape = new Konva.Image({
                    x: imageObj.x,
                    y: imageObj.y,
                    image: image,
                    width: imageObj.width,
                    height: imageObj.height,
                    rotation: imageObj.rotation,
                    draggable: imageObj.isDragging,
                });
                break;

            default:
                break;
        }

        konvaShape?.setAttrs({
            id: shape.id,
            draggable: shape.isDragging
        });

        layer.add(konvaShape);
    }
}

export const findShape = (canvasDesign: CanvasDesignData, id: string | null): ShapeObj | undefined => {
    if (!id) {
        return undefined;
    }
    for (const shape of canvasDesign.Shapes) {
        if (shape.id === id) {
            return shape;
        }
        if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            for (const row of textTable.rows) {
                for (const cell of row) {
                    if (cell.content.id === id) {
                        return cell.content;
                    }
                }
            }
        }
    }
    return undefined;
};

export const findCell = (canvasDesign: CanvasDesignData, id: string | null): ShapeObj | undefined => {
    if (!id) {
        return undefined;
    }
    for (const shape of canvasDesign.Shapes) {
        if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            for (const row of textTable.rows) {
                for (const cell of row) {
                    if (cell.content.id === id) {
                        return cell;
                    }
                }
            }
        }
    }
    return undefined;
};

export const isTextObject = (shape?: ShapeObj): boolean => {
    return shape?.type === 'TextInput' || shape?.type === 'TextField';
};

export const isNested = (canvasDesign: CanvasDesignData, id: string | null): boolean => {
    if (!id) {
        return false;
    }
    for (const shape of canvasDesign.Shapes) {
        if (shape.id === id) {
            return false;
        }
        if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            for (const row of textTable.rows) {
                for (const cell of row) {
                    if (cell.content.id === id) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};


export const updateShapeProperty = (canvasDesign: CanvasDesignData, setCanvasDesign: Function, propertyName: string, value: any, id: string | null) => {
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        // Skip any further updates after the first match is found and updated
        if (foundAndUpdated) return shape;

        // Update the matching shape directly
        if (shape.id === id) {
            foundAndUpdated = true;
            return { ...shape, [propertyName]: value };
        }

        // Handle nested shapes for TextTable
        else if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            let isCellUpdated = false;
            const updatedRows = textTable.rows.map(row =>
                row.map(cell => {
                    if (cell.content.id === id && !isCellUpdated) {
                        isCellUpdated = true;
                        foundAndUpdated = true;

                        return { ...cell, content: { ...cell.content, [propertyName]: value } };
                    }
                    return cell;
                })
            );

            // If any cell was updated, return the updated TextTable shape
            if (isCellUpdated) {
                return { ...shape, rows: updatedRows };
            }
        }

        // Return the shape unchanged if no conditions are met
        return shape;
    });

    // Update the canvasDesign only if an update was made
    if (foundAndUpdated) {
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    }
};

export const updateCellProperty = (canvasDesign: CanvasDesignData, setCanvasDesign: Function, propertyName: string, value: any, id: string | null) => {
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {

        if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            let isCellUpdated = false;
            const updatedRows = textTable.rows.map(row =>
                row.map(cell => {
                    if (cell.content.id === id && !isCellUpdated) {
                        isCellUpdated = true;
                        foundAndUpdated = true;

                        return { ...cell, [propertyName]: value };
                    }
                    return cell;
                })
            );

            // If any cell was updated, return the updated TextTable shape
            if (isCellUpdated) {
                return { ...shape, rows: updatedRows };
            }
        }

        // Return the shape unchanged if no conditions are met
        return shape;
    });

    // Update the canvasDesign only if an update was made
    if (foundAndUpdated) {
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    }
};

export const deleteShape = ({ canvasDesign, setCanvasDesign }: any) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === canvasDesign.selectedId) {
            updatedCanvasDesign.Shapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== canvasDesign.selectedId);
        }
    });
    canvasDesign.selectedId = null;
    setCanvasDesign(updatedCanvasDesign);
    selectShape(null, updatedCanvasDesign, setCanvasDesign);
}

export const moveShape = ({ canvasDesign, setCanvasDesign, direction }: any) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === canvasDesign.selectedId) {
            switch (direction) {
                case 'up':
                    shape.y -= 10;
                    break;
                case 'down':
                    shape.y += 10;
                    break;
                case 'left':
                    shape.x -= 10;
                    break;
                case 'right':
                    shape.x += 10;
                    break;
                default:
                    break;
            }
        }
    });
    setCanvasDesign(updatedCanvasDesign);
}

export const selectShape = (id: string | null, canvasDesign: any, setCanvasDesign: any) => {
    setCanvasDesign({
        ...canvasDesign,
        selectedId: id,
    });
};



export const pasteObject = (canvasDesign: CanvasDesignData, setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>, copiedObject: any) => {

    const updatedCanvasDesign = { ...canvasDesign }; // Make a shallow copy of the canvasDesign object

    const pastedObject = JSON.parse(JSON.stringify(copiedObject)); // Make a deep copy of the copiedObject
    pastedObject.id = generateShapeId(); // Generate a unique ID for the pasted object
    pastedObject.x = copiedObject.x + 20;
    pastedObject.y = copiedObject.y + 20;

    updatedCanvasDesign.Shapes.push(pastedObject);
    updatedCanvasDesign.selectedId = pastedObject.id; // Select the pasted object

    setCanvasDesign(updatedCanvasDesign); // Update the canvasDesign state with the pasted object
};

export const toggleTextStyle = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (shape.id === canvasDesign.selectedId) {
            const textShape = shape as TextInputObj | TextFieldObj;
            const currentStyle = textShape[styleProperty] || '';
            const isStyleApplied = currentStyle.includes(style);
            textShape[styleProperty] = isStyleApplied
                ? currentStyle.replace(style, '').trim()
                : `${currentStyle} ${style}`.trim();

            return { ...textShape, [styleProperty]: textShape[styleProperty] };
        }
        else if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            const updatedRows = textTable.rows.map(row =>
                row.map(cell => {
                    if (cell.content.id === canvasDesign.selectedId) {
                        const currentStyle = cell.content[styleProperty] || '';
                        const isStyleApplied = currentStyle.includes(style);
                        cell.content[styleProperty] = isStyleApplied
                            ? currentStyle.replace(style, '').trim()
                            : `${currentStyle} ${style}`.trim();
                        return { ...cell, [styleProperty]: cell.content[styleProperty] };
                    }
                    return cell;
                })
            );
            return { ...textTable, rows: updatedRows };
        }
        return shape;
    });
    setCanvasDesign({
        ...canvasDesign,
        Shapes: updatedShapes,
    });
};
