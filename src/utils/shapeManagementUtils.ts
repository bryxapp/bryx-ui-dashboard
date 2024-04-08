import Konva from "konva";
import { CanvasDesignData, EllipseObj, ImageObj, InputObj, RectangleObj, ShapeObj, InputType, InputTypes, TextObj, TextTypes, TextType, ShapeType, ShapeTypes } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";
import { loadImage } from "./canvasUtils";
import { createTempTextKonvaShape } from "../Components/Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";

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
            case 'PhoneInput':
            case 'EmailInput':
            case 'ShortTextInput':
                const textInput = shape as InputObj;
                // Create a Konva.Text object for placeholder to calculate its width and height
                const placeholderText = new Konva.Text({
                    text: textInput.content.value,
                    fontSize: textInput.content.fontSize,
                    fontFamily: textInput.content.fontFamily,
                    fontStyle: textInput.content.fontStyle,
                    textDecoration: textInput.content.textDecoration,
                    align: textInput.content.align
                });

                const containerHeight = textInput.content.fontSize * 2;

                // Calculate the position to center the text within the TextInput shape
                //const x =  + (containerWidth - placeholderText.width()) / 2;
                const centered_y = textInput.y + (containerHeight - placeholderText.height()) / 2;

                konvaShape = new Konva.Text({
                    x: textInput.x,
                    y: centered_y,
                    text: fieldValues[textInput.id],
                    fontSize: textInput.content.fontSize,
                    fill: textInput.content.fill,
                    rotation: textInput.rotation,
                    fontFamily: textInput.content.fontFamily,
                    fontStyle: textInput.content.fontStyle,
                    textDecoration: textInput.content.textDecoration,
                    align: textInput.content.align
                });
                break;
            case 'Heading':
            case 'Paragraph':
                const textObj = shape as TextObj;
                konvaShape = new Konva.Text({
                    x: textObj.x,
                    y: textObj.y,
                    text: textObj.value,
                    fontSize: textObj.fontSize,
                    fill: textObj.fill,
                    rotation: textObj.rotation,
                    fontFamily: textObj.fontFamily,
                    fontStyle: textObj.fontStyle,
                    textDecoration: textObj.textDecoration,
                    align: textObj.align
                });
                break;
            //TODO add labels
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
    }
    return undefined;
};

export const getShapeWidth = (shape:ShapeObj): number => {
    switch (shape.type) {
        case 'Rectangle':
        case 'RoundedRectangle':
            return (shape as RectangleObj).width;
        case 'Ellipse':
            return (shape as EllipseObj).radiusX * 2;
        case 'Image':
            return (shape as ImageObj).width;
        case 'Heading':
        case 'Paragraph':
            const paragraphObj = shape as TextObj;
            const tempTextShape = createTempTextKonvaShape(paragraphObj);
            return tempTextShape.width();
        case 'PhoneInput':
        case 'EmailInput':
        case 'ShortTextInput':
            const inputObj = shape as InputObj;
            const tempTextShapeLabel = createTempTextKonvaShape(inputObj.label);
            const tempTextShapeContent = createTempTextKonvaShape(inputObj.content);
            return Math.max(tempTextShapeContent.width(), tempTextShapeLabel.width());
        default:
            return 0;
    }
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
    return shape ? ShapeTypes.includes(shape.type as ShapeType) : false;
};

export const isImageObject = (shape?: ShapeObj): boolean => {
    return shape ? shape.type === 'Image' : false;
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
        }
    });
    setSelectedId(null)
    setCanvasDesign(updatedCanvasDesign);
}

export const moveShape = (canvasDesign: CanvasDesignData, setCanvasDesign: any, direction:string, selectedId: string|null) => {
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


export const pasteObject = (canvasDesign: CanvasDesignData, setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>, selectedId: string|null, copiedObject: any) => {

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
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>,
    selectedId: string|null,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (shape.id === selectedId) {
            const textShape = shape as TextObj;
            const currentStyle = textShape[styleProperty] || '';
            const isStyleApplied = currentStyle.includes(style);
            textShape[styleProperty] = isStyleApplied
                ? currentStyle.replace(style, '').trim()
                : `${currentStyle} ${style}`.trim();

            return { ...textShape, [styleProperty]: textShape[styleProperty] };
        }
        return shape;
    });
    setCanvasDesign({
        ...canvasDesign,
        Shapes: updatedShapes,
    });
};

