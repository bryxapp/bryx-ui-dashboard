import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { circleObj, rectangleObj, textFieldObj, textInputObj } from "./types/ShapeInterfaces";

export function createStage(canvasDesign: any, fieldValues: string[]) {
    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: getWebCanvasWidth(),
        height: getWebCanvasHeight(),
        fill: "white"
    });
    layer.add(rect);

    canvasDesign.Rectangles.forEach((rectangle: rectangleObj) => {
        const rect = new Konva.Rect({
            x: rectangle.x,
            y: rectangle.y,
            width: rectangle.width,
            height: rectangle.height,
            fill: rectangle.fill,
            rotation: rectangle.rotation,
        });
        layer.add(rect);
    });

    canvasDesign.Circles.forEach((circle: circleObj) => {
        const circ = new Konva.Circle({
            x: circle.x,
            y: circle.y,
            radius: circle.radius,
            fill: circle.fill,
            rotation: circle.rotation,
        });
        layer.add(circ);
    });

    canvasDesign.Lines.forEach((line: any) => {
        console.log(line)
        const lineObj = new Konva.Line({
            x: line.x,
            y: line.y,
            points: line.points,
            stroke: line.stroke,
            strokeWidth: line.strokeWidth,
            rotation: line.rotation,
        });
        layer.add(lineObj);
    });


    canvasDesign.TextInputs.forEach((textInput: textInputObj, index: number) => {
        const text = new Konva.Text({
            x: textInput.x,
            y: textInput.y,
            text: fieldValues[index],
            fontSize: textInput.fontSize,
            fontColor: textInput.fontColor,
            rotation: textInput.rotation,
        });
        layer.add(text);
    });

    canvasDesign.TextFields.forEach((textField: textFieldObj, index: number) => {
        const text = new Konva.Text({
            x: textField.x,
            y: textField.y,
            text: textField.value,
            fontSize: textField.fontSize,
            fontColor: textField.fontColor,
            rotation: textField.rotation,
        });
        layer.add(text);
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
