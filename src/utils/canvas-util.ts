import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, TextFieldObj, TextInputObj } from "./types/CanvasInterfaces";

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}


export async function createStage(canvasDesign: CanvasDesignData, fieldValues: string[]) {
    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: getWebCanvasWidth(),
        height: getWebCanvasHeight(),
        fill: "white"
    });
    layer.add(rect);

    let index = 0;
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
                    fieldValues[index] = "$" + fieldValues[index];
                }
                konvaShape = new Konva.Text({
                    x: textInput.x,
                    y: textInput.y,
                    text: fieldValues[index],
                    fontSize: textInput.fontSize,
                    fill: textInput.fill,
                    rotation: textInput.rotation,
                    fontFamily: textInput.fontFamily,
                    fontStyle: textInput.fontStyle,
                    textDecoration: textInput.textDecoration
                });
                index++; //Increment textinput pointer
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

    let dataUrlSettings = {
        type: "image/png",
        quality: 1,
        pixelRatio: 1,
        height: getWebCanvasHeight(),
        width: getWebCanvasWidth(),
        x: 0,
        y: 0,
    };
    return stage.toDataURL(dataUrlSettings);
}