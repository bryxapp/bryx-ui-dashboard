import Konva from "konva";
import { getWebCanvasHeight, getWebCanvasWidth } from "./page-util";
import { rectangleObj, textObj } from "./types/ShapeInterfaces";

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
        });
        layer.add(rect);
    });

    canvasDesign.TextInputs.forEach((textInput: textObj, index: number) => {
        const text = new Konva.Text({
            x: textInput.x,
            y: textInput.y,
            text: fieldValues[index],
            fontSize: textInput.fontSize,
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
