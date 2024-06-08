import Konva from "konva";
import { CanvasDesignData, EllipseObj, ImageObj, InputObj, RectangleObj, ShapeObj, InputType, InputTypes, TextObj, TextTypes, TextType, SolidShapeType, SolidShapeTypes, ImageTypes, ImageType, SolidShapeObj, HeadingObj, ParagraphObj, TableInputObj, TableTypes, TableType, CellTypes, CellType, LongTextInputObj } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";
import { loadImage } from "./canvasUtils";
import { createTempTextKonvaShape, getInputXAlignment, getInputYAlignment } from "../Components/Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";

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

export async function AddShapesToLayer(canvasDesign: CanvasDesignData, formInputs: EstimateFormFields, layer: Konva.Layer) {
    for (const shape of canvasDesign.Shapes) {
        switch (shape.type) {
            case 'Rectangle':
                const rectangle = shape as RectangleObj;
                layer.add(new Konva.Rect({
                    x: rectangle.x,
                    y: rectangle.y,
                    width: rectangle.width,
                    height: rectangle.height,
                    fill: rectangle.fill,
                    stroke: rectangle.stroke,
                    strokeWidth: rectangle.strokeWidth,
                    rotation: rectangle.rotation,
                }))
                break;
            case 'RoundedRectangle':
                const roundedRectangle = shape as RectangleObj;
                layer.add(new Konva.Rect({
                    x: roundedRectangle.x,
                    y: roundedRectangle.y,
                    width: roundedRectangle.width,
                    height: roundedRectangle.height,
                    fill: roundedRectangle.fill,
                    stroke: roundedRectangle.stroke,
                    strokeWidth: roundedRectangle.strokeWidth,
                    cornerRadius: roundedRectangle.cornerRadius,
                    rotation: roundedRectangle.rotation,
                }))
                break;
            case 'Ellipse':
                const ellipse = shape as EllipseObj;
                layer.add(new Konva.Ellipse({
                    x: ellipse.x,
                    y: ellipse.y,
                    radiusX: ellipse.radiusX,
                    radiusY: ellipse.radiusY,
                    fill: ellipse.fill,
                    stroke: ellipse.stroke,
                    strokeWidth: ellipse.strokeWidth,
                    rotation: ellipse.rotation,
                }))
                break;
            case 'UserImage':
                const imageObj = shape as ImageObj;
                const image = await loadImage(imageObj.src);
                layer.add(new Konva.Image({
                    x: imageObj.x,
                    y: imageObj.y,
                    image: image,
                    width: imageObj.width,
                    height: imageObj.height,
                    rotation: imageObj.rotation,
                }))
                break;
            case 'PhoneInput':
            case 'EmailInput':
            case 'ShortTextInput':
            case 'DateInput':
                const inputObj = shape as InputObj;
                //Create Group
                const group = new Konva.Group({
                    x: inputObj.x,
                    y: inputObj.y,
                    rotation: inputObj.rotation,
                });
                group.add(new Konva.Text({
                    x: getInputXAlignment(inputObj, formInputs[inputObj.id].value),
                    y: 0,
                    text: formInputs[inputObj.id].value,
                    fontSize: inputObj.fontSize,
                    fill: inputObj.fill,
                    fontFamily: inputObj.fontFamily,
                    fontStyle: inputObj.fontStyle,
                    textDecoration: inputObj.textDecoration,
                    horizontalAlign: inputObj.horizontalAlign
                }))
                layer.add(group);
                break;
            case 'LongTextInput':
                const longTextInput = shape as LongTextInputObj;
                //Create Group
                const longTextInputgroup = new Konva.Group({
                    x: longTextInput.x,
                    y: longTextInput.y,
                    rotation: longTextInput.rotation,
                });
                longTextInputgroup.add(new Konva.Text({
                    x: getInputXAlignment(longTextInput, formInputs[longTextInput.id].value),
                    y: getInputYAlignment(longTextInput,formInputs[longTextInput.id].value, longTextInput.verticalAlign),
                    text: formInputs[longTextInput.id].value,
                    fontSize: longTextInput.fontSize,
                    fill: longTextInput.fill,
                    fontFamily: longTextInput.fontFamily,
                    fontStyle: longTextInput.fontStyle,
                    textDecoration: longTextInput.textDecoration,
                    horizontalAlign: longTextInput.horizontalAlign,
                }))
                layer.add(longTextInputgroup);
                break;
            case 'Heading':
                const headingObj = shape as HeadingObj;
                layer.add(new Konva.Text({
                    x: headingObj.x,
                    y: headingObj.y,
                    text: headingObj.textValue,
                    fontSize: headingObj.fontSize,
                    fill: headingObj.fill,
                    rotation: headingObj.rotation,
                    fontFamily: headingObj.fontFamily,
                    fontStyle: headingObj.fontStyle,
                    textDecoration: headingObj.textDecoration,
                }))
                break;
            case 'Paragraph':
                const paragraphObj = shape as ParagraphObj;
                layer.add(new Konva.Text({
                    x: paragraphObj.x,
                    y: paragraphObj.y,
                    text: paragraphObj.textValue,
                    fontSize: paragraphObj.fontSize,
                    fill: paragraphObj.fill,
                    rotation: paragraphObj.rotation,
                    fontFamily: paragraphObj.fontFamily,
                    fontStyle: paragraphObj.fontStyle,
                    textDecoration: paragraphObj.textDecoration,
                    horizontalAlign: paragraphObj.horizontalAlign
                }))
                break;
            case 'TableInput':
                const tableInputObj = shape as TableInputObj;
                const tableInputObjGroup = new Konva.Group({
                    x: tableInputObj.x,
                    y: tableInputObj.y,
                    rotation: tableInputObj.rotation,
                });
                tableInputObj.rows.forEach((row, rowIndex) => {
                    row.forEach((cell, cellIndex) => {
                        if (!cell.content) return;
                        const isInputCell = cell.content.type === 'CellInput';
                        const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
                        const cellYPosition = tableInputObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);
                        let value = cell.content.textValue;
                        if (isInputCell && formInputs) {
                            value = formInputs[cell.id].value || '';
                        }
                        const cellGroup = new Konva.Group({
                            x: cellXPosition + 2,
                            y: cellYPosition + 2,
                        });
                        const text = new Konva.Text({
                            text: value,
                            fontSize: cell.content.fontSize,
                            fill: cell.content.fill,
                            width: cell.width - 4,
                            height: cell.height - 4,
                            fontFamily: cell.content.fontFamily,
                            fontStyle: cell.content.fontStyle,
                            textDecoration: cell.content.textDecoration,
                            align: cell.horizontalAlign,
                            verticalAlign: cell.verticalAlign,
                        });
                        cellGroup.add(text);
                        tableInputObjGroup.add(cellGroup);
                    });
                    layer.add(tableInputObjGroup);
                });
                break;
            default:
                break;
        }
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
        if (isTableObject(shape)) {
            const tableInputObj = shape as TableInputObj;
            for (const row of tableInputObj.rows) {
                for (const cell of row) {
                    if (cell.id === id) {
                        return cell;
                    }
                }
            }
        }
    }
    return undefined;
};

export const getShapeWidth = (shape: SolidShapeObj | ImageObj): number => {
    switch (shape.type) {
        case 'Rectangle':
        case 'RoundedRectangle':
            return (shape as RectangleObj).width;
        case 'Ellipse':
            return (shape as EllipseObj).radiusX * 2;
        case 'UserImage':
            return (shape as ImageObj).width;
        default:
            return 0;
    }
};

export const getTextWidthAndHeight = (textObj: TextObj, textValue:string): [number, number] => {
    const tempTextShape = createTempTextKonvaShape(textObj, textValue);
    return [tempTextShape.width(), tempTextShape.height()];
};

export const getPhoneInputWidthandHeight = (textObj: TextObj): [number, number] => {
    const PHONE_NUMBER_LENGTH = 12;
    const tempTextShape = createTempTextKonvaShape(textObj, 'X'.repeat(PHONE_NUMBER_LENGTH));
    return [tempTextShape.width(), tempTextShape.height()];
}

export const getEmailInputWidthandHeight = (textObj: TextObj): [number, number] => {
    const EMAIL_LENGTH = 25;
    const tempTextShape = createTempTextKonvaShape(textObj, 'X'.repeat(EMAIL_LENGTH));
    return [tempTextShape.width(), tempTextShape.height()];
}


export const getTransformerProperties = (shape: ShapeObj): [boolean, boolean, boolean] => {
    //[rotationEnabled,horizontalResizeEnabled,verticalResizeEnabled]
    switch (shape.type) {
        case 'Rectangle':
        case 'RoundedRectangle':
        case 'Ellipse':
        case 'UserImage':
            return [true, true, true];
        case 'Heading':
        case 'Paragraph':
            return [true, false, false];
        case 'PhoneInput':
        case 'EmailInput':
        case 'DateInput':
            return [true, false, false];
        case 'ShortTextInput':
            return [true, true, false];
        case 'LongTextInput':
            return [true, true, true];
        case 'TableInput':
            return [true, false, false];
        default:
            return [false, false, false];

    }
}



export const getTextShape = (canvasDesign: CanvasDesignData, id: string | null) => {
    const selectedShape = findShape(canvasDesign, id)
    if (!selectedShape) return
    return (selectedShape as TextObj)
}

export const getInputShape = (canvasDesign: CanvasDesignData, id: string | null) => {
    const selectedShape = findShape(canvasDesign, id)
    if (!selectedShape) return
    return (selectedShape as InputObj)
}

export const isTextObject = (shape?: ShapeObj): boolean => {
    return shape ? TextTypes.includes(shape.type as TextType) : false;
};

export const isInputObject = (shape?: ShapeObj): boolean => {
    return shape ? InputTypes.includes(shape.type as InputType) : false;
};

export const isTableObject = (shape?: ShapeObj): boolean => {
    return shape ? TableTypes.includes(shape.type as TableType) : false;
};

export const isCellObject = (shape?: ShapeObj): boolean => {
    return shape ? CellTypes.includes(shape.type as CellType) : false;
};

export const isSolidShapeObj = (shape?: ShapeObj): boolean => {
    return shape ? SolidShapeTypes.includes(shape.type as SolidShapeType) : false;
};

export const isImageObject = (shape?: ShapeObj): boolean => {
    return shape ? ImageTypes.includes(shape.type as ImageType) : false;
}

export const updateShapeProperty = (canvasDesign: CanvasDesignData, setCanvasDesign: Function, propertyName: string, value: any, id: string | null) => {
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        // Skip any further updates after the first match is found and updated
        if (foundAndUpdated) return shape;

        // Update the matching shape directly
        if (shape.id === id) {
            foundAndUpdated = true;
            if (isInputObject(shape)) {
                //Need to update width and height
                const inputObj = { ...shape, [propertyName]: value } as InputObj;
                switch (inputObj.type) {
                    case 'PhoneInput':
                        const [phoneWidth, phoneHeight] = getPhoneInputWidthandHeight(inputObj);
                        inputObj.height = phoneHeight;
                        inputObj.width = phoneWidth;
                        break;
                    case 'EmailInput':
                        const [emailWidth, emailHeight] = getEmailInputWidthandHeight(inputObj);
                        inputObj.height = emailHeight;
                        inputObj.width = emailWidth;
                        break;
                    case 'ShortTextInput':
                        const [, contentHeight] = getTextWidthAndHeight(inputObj,inputObj.textValue);
                        inputObj.height = contentHeight;
                        break;
                    case 'DateInput':
                        const [dateWidth, dateHeight] = getTextWidthAndHeight(inputObj,inputObj.textValue);
                        inputObj.height = dateHeight;
                        inputObj.width = dateWidth;
                        break;
                    case 'LongTextInput':
                    default:
                        break;
                }
                return inputObj;
            }
            else return { ...shape, [propertyName]: value };
        }

        if (shape.type === 'TableInput') {
            const tableInputObj = shape as TableInputObj;
            const updatedRows = tableInputObj.rows.map((row) => {
                return row.map((cell) => {
                    if (cell.id === id) {
                        foundAndUpdated = true;
                        return { ...cell, [propertyName]: value };
                    }
                    return cell;
                });
            });
            return { ...tableInputObj, rows: updatedRows };
        }

        // Return the shape unchanged if no conditions are met
        return shape;
    });

    // Update the canvasDesign only if an update was made
    if (foundAndUpdated) {
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    }
};

export const updateCellContentProperty = (canvasDesign: CanvasDesignData, setCanvasDesign: Function, propertyName: string, value: any, id: string | null) => {
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        // Skip any further updates after the first match is found and updated
        if (foundAndUpdated || shape.type !== 'TableInput') return shape;

        const tableInputObj = shape as TableInputObj;
        const updatedRows = tableInputObj.rows.map((row) => {
            return row.map((cell) => {
                if (cell.id === id) {
                    foundAndUpdated = true;
                    const updatedContent = { ...cell.content, [propertyName]: value };
                    return { ...cell, content: updatedContent };
                }
                return cell;
            });
        });
        return { ...tableInputObj, rows: updatedRows };
    });

    // Update the canvasDesign only if an update was made
    if (foundAndUpdated) {
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    }
};



export const deleteShape = (canvasDesign: CanvasDesignData, setCanvasDesign: any, selectedId: string | null, setSelectedId: any) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === selectedId) {
            updatedCanvasDesign.Shapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== selectedId);
            updatedCanvasDesign.inputOrder = updatedCanvasDesign.inputOrder.filter((id: string) => id !== selectedId);
        }
    });
    setSelectedId(null)
    setCanvasDesign(updatedCanvasDesign);
}

export const moveShape = (canvasDesign: CanvasDesignData, setCanvasDesign: any, direction: string, selectedId: string | null) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === selectedId) {
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


export const pasteObject = (canvasDesign: CanvasDesignData, setCanvasDesign: (newDesign: CanvasDesignData) => void, selectedId: string | null, copiedObject: any) => {

    const updatedCanvasDesign = { ...canvasDesign }; // Make a shallow copy of the canvasDesign object

    const pastedObject = JSON.parse(JSON.stringify(copiedObject)); // Make a deep copy of the copiedObject
    pastedObject.id = generateShapeId(); // Generate a unique ID for the pasted object
    pastedObject.x = copiedObject.x + 20;
    pastedObject.y = copiedObject.y + 20;

    updatedCanvasDesign.Shapes.push(pastedObject);
    selectedId = pastedObject.id; // Select the pasted object
    if (isInputObject(pastedObject) || isTableObject(pastedObject)) {
        updatedCanvasDesign.inputOrder.push(pastedObject.id);
    }

    setCanvasDesign(updatedCanvasDesign); // Update the canvasDesign state with the pasted object
};

export const toggleTextStyle = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: (newDesign: CanvasDesignData) => void,
    selectedId: string | null,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (shape.id === selectedId) {
            const textObj = shape as TextObj;
            const currentStyle = textObj[styleProperty] || '';
            const isStyleApplied = currentStyle.includes(style);
            textObj[styleProperty] = isStyleApplied
                ? currentStyle.replace(style, '').trim()
                : `${currentStyle} ${style}`.trim();
        }
        return shape;
    });
    setCanvasDesign({
        ...canvasDesign,
        Shapes: updatedShapes,
    });
};


export const toggleCellTextStyle = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: (newDesign: CanvasDesignData) => void,
    selectedId: string | null,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (foundAndUpdated || shape.type !== 'TableInput') return shape;

        const tableInputObj = shape as TableInputObj;
        const updatedRows = tableInputObj.rows.map((row) => {
            return row.map((cell) => {
                if (cell.id === selectedId) {
                    foundAndUpdated = true;
                    const textObj = { ...cell.content } as TextObj;
                    const currentStyle = textObj[styleProperty] || '';
                    const isStyleApplied = currentStyle.includes(style);
                    const value = isStyleApplied
                        ? currentStyle.replace(style, '').trim()
                        : `${currentStyle} ${style}`.trim();
                        const updatedContent = { ...cell.content, [styleProperty]: value };
                        return { ...cell, content: updatedContent };
                }
                return cell;
            });
        });
        return { ...tableInputObj, rows: updatedRows };
    });

    if (foundAndUpdated) {
        setCanvasDesign({
            ...canvasDesign,
            Shapes: updatedShapes,
        });
    }
};


