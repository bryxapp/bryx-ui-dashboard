import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { CanvasDesignData, CircleObj, ImageObj, LineObj, RectangleObj, ShapeObj, TextFieldObj, TextInputObj } from "./types/CanvasInterfaces";

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

    canvasDesign.Shapes.forEach((shape: ShapeObj, index: number) => {
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
            case 'Circle':
                const circle = shape as CircleObj;
                konvaShape = new Konva.Circle({
                    x: circle.x,
                    y: circle.y,
                    radius: circle.radius,
                    fill: circle.fill,
                    rotation: circle.rotation,
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
                konvaShape = new Konva.Text({
                    x: textInput.x,
                    y: textInput.y,
                    text: fieldValues[index],
                    fontSize: textInput.fontSize,
                    fontColor: textInput.fill,
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
                    fontColor: textField.fill,
                    rotation: textField.rotation,
                    fontFamily: textField.fontFamily,
                    fontStyle: textField.fontStyle,
                    textDecoration: textField.textDecoration
                });
                break;
            case 'Image':
                const imageObj = shape as ImageObj;
                const image = new Image();
                image.crossOrigin = "Anonymous";
                image.src = imageObj.src;
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
    });

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