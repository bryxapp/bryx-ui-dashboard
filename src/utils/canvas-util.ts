import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, TextFieldObj, TextInputObj } from "./types/CanvasInterfaces";
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


export async function createStage(canvasDesign: CanvasDesignData, fieldValues: EstimateFormFields) {
    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: getWebCanvasWidth(),
        height: getWebCanvasHeight(),
        fill: "white"
    });
    layer.add(rect);

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
                    textDecoration: textInput.textDecoration
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
                    textDecoration: textInput.textDecoration
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
                    textDecoration: textField.textDecoration
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

            default:
                break;
        }

        konvaShape?.setAttrs({
            id: shape.id,
            draggable: shape.isDragging
        });

        layer.add(konvaShape);
    }

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

    const pixelRatio = 1.25;

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

    return stage.toDataURL(dataUrlSettings);
}