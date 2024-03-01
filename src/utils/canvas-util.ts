import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, ShapeObj, TextFieldObj, TextInputObj, TextTableObj } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
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

export async function createImageUrl(canvasDesign: CanvasDesignData, fieldValues: EstimateFormFields) {
    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: getWebCanvasWidth(),
        height: getWebCanvasHeight(),
        fill: "white"
    });
    layer.add(rect);

    await AddShapesToLayer(canvasDesign, fieldValues, layer);

    //Create container for stage
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    const stage = new Konva.Stage({
        container: "container",
        width: getWebCanvasWidth(),
        height: getWebCanvasHeight(),
    });
    stage.add(layer);

    const pixelRatio = 1.4;

    const dataUrlSettings = {
        type: "image/png",
        quality: 1,
        pixelRatio: pixelRatio,
        height: getWebCanvasHeight() * pixelRatio,
        width: getWebCanvasWidth() * pixelRatio,
        x: 0,
        y: 0,
    };
    stage.scale({ x: pixelRatio, y: pixelRatio });
    const stageData = stage.toDataURL(dataUrlSettings);
    //Remove container
    document.body.removeChild(container);
    return stageData;
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
                        foundAndUpdated = true; // Mark that the update has occurred
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

export const drawBorders = (textTableObj: TextTableObj) => {
    if (!textTableObj.border) return [];
    const bordersProps = [];
    const tableWidth = textTableObj.rows[0].reduce((acc, cell) => acc + cell.width, 0);
    const tableHeight = textTableObj.rows.reduce((acc, row) => acc + row[0].height, 0);

    // Vertical lines
    for (let i = 1; i < textTableObj.rows[0].length; i++) {
        // Calculate the X position of the vertical line after each column
        const xPos = textTableObj.rows[0].slice(0, i).reduce((acc, cell) => acc + cell.width, 0);
        bordersProps.push({
            key: `v-${i}`,
            points: [xPos, 0, xPos, tableHeight],
            stroke: textTableObj.border.color,
            strokeWidth: textTableObj.border.width
        });
    }

    // Horizontal lines
    let accumulatedHeight = 0; // Keep track of the accumulated heights for accurate line positioning
    for (let i = 1; i < textTableObj.rows.length; i++) {
        accumulatedHeight += textTableObj.rows[i - 1][0].height;
        bordersProps.push({
            key: `h-${i}`,
            points: [0, accumulatedHeight, tableWidth, accumulatedHeight],
            stroke: textTableObj.border.color,
            strokeWidth: textTableObj.border.width,
        });
    }

    return bordersProps;
};



