import Konva from "konva";
import { CanvasDesignData, EllipseObj, ImageObj, InputObj, RectangleObj, ShapeObj, InputType, InputTypes, TextObj, TextTypes, TextType, SolidShapeType, SolidShapeTypes, ImageTypes, ImageType, SolidShapeObj, TextBase, HeadingObj, ParagraphObj } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";
import { loadImage } from "./canvasUtils";
import { createTempTextKonvaShape, getInputXAlignment, getTextXAlignment } from "../Components/Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";

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
            case 'StockImage':
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
            case 'LongTextInput':
            case 'DateInput':
                const inputObj = shape as InputObj;
                //Create Group
                const group = new Konva.Group({
                    x: inputObj.x,
                    y: inputObj.y,
                    rotation: inputObj.rotation,
                });
                //Create Label Text Shape for measurements
                const inputLabel = inputObj.label;
                const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(inputLabel, inputLabel.value);
                // Create Content Text Shape for measurements
                const inputContent = inputObj.content;
                const [contentShapeWidth,] = getTextWidthAndHeight(inputContent, formInputs[inputObj.id].value);
                //Container Measurements 
                const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);
                if (inputObj.hasLabel) {
                    group.add(new Konva.Text({
                        x: getTextXAlignment(inputLabel, containerWidth, inputLabel.horizontalAlign),
                        y: 0,
                        text: inputLabel.value,
                        fontSize: inputLabel.fontSize,
                        fill: inputLabel.fill,
                        fontFamily: inputLabel.fontFamily,
                        fontStyle: inputLabel.fontStyle,
                        textDecoration: inputLabel.textDecoration,
                        horizontalAlign: inputLabel.horizontalAlign
                    }))
                }
                //Add Content
                const value = formInputs[inputObj.id].value;
                group.add(new Konva.Text({
                    x: getInputXAlignment(inputContent, value, containerWidth),
                    y: inputObj.hasLabel ? labelShapeHeight + (inputLabel.fontSize / 10) : 0,
                    text: value,
                    fontSize: inputContent.fontSize,
                    fill: inputContent.fill,
                    fontFamily: inputContent.fontFamily,
                    fontStyle: inputContent.fontStyle,
                    textDecoration: inputContent.textDecoration,
                    horizontalAlign: inputContent.horizontalAlign
                }))
                layer.add(group);
                break;
            case 'Heading':
                const headingObj = shape as HeadingObj;
                layer.add(new Konva.Text({
                    x: headingObj.x,
                    y: headingObj.y,
                    text: headingObj.value,
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
                    text: paragraphObj.value,
                    fontSize: paragraphObj.fontSize,
                    fill: paragraphObj.fill,
                    rotation: paragraphObj.rotation,
                    fontFamily: paragraphObj.fontFamily,
                    fontStyle: paragraphObj.fontStyle,
                    textDecoration: paragraphObj.textDecoration,
                    horizontalAlign: paragraphObj.horizontalAlign
                }))
                break;
            //TODO add labels
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
        case 'StockImage':
            return (shape as ImageObj).width;
        default:
            return 0;
    }
};

export const getTextWidthAndHeight = (textObj: TextBase, value: string): [number, number] => {
    const tempTextShape = createTempTextKonvaShape(textObj, value);
    return [tempTextShape.width(), tempTextShape.height()];
};

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
            return { ...shape, [propertyName]: value };
        }

        // Return the shape unchanged if no conditions are met
        return shape;
    });

    // Update the canvasDesign only if an update was made
    if (foundAndUpdated) {
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    }
};

export const updateInputProperty = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: Function,
    itemName: 'content' | 'label',
    propertyName: string,
    value: any,
    id: string | null
) => {
    let foundAndUpdated = false;

    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        // Skip any further updates after the first match is found and updated
        if (foundAndUpdated) return shape;

        if (shape.id === id) {
            foundAndUpdated = true;
            let inputObj = shape as InputObj;
            // Correct way to dynamically update nested properties
            const updatedItem = { ...inputObj[itemName], [propertyName]: value };
            return { ...inputObj, [itemName]: updatedItem };
        }

        // Return the shape unchanged if no conditions are met
        return shape;
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

    setCanvasDesign(updatedCanvasDesign); // Update the canvasDesign state with the pasted object
};

export const toggleTextStyle = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: (newDesign: CanvasDesignData) => void,
    selectedId: string | null,
    itemType: 'content' | 'label' | null,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (shape.id === selectedId) {
            if (itemType === null) {
                const textObj = shape as TextObj;
                const currentStyle = textObj[styleProperty] || '';
                const isStyleApplied = currentStyle.includes(style);
                textObj[styleProperty] = isStyleApplied
                    ? currentStyle.replace(style, '').trim()
                    : `${currentStyle} ${style}`.trim();
            }
            else {
                const inputObj = shape as InputObj;
                const currentStyle = inputObj[itemType][styleProperty] || '';
                const isStyleApplied = currentStyle.includes(style);
                inputObj[itemType][styleProperty] = isStyleApplied
                    ? currentStyle.replace(style, '').trim()
                    : `${currentStyle} ${style}`.trim();
                return { ...shape, [styleProperty]: inputObj[itemType][styleProperty] };
            }
        }
        return shape;
    });
    setCanvasDesign({
        ...canvasDesign,
        Shapes: updatedShapes,
    });
};

