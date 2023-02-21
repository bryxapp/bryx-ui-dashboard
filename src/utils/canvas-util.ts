import Konva from "konva";
import { shapeObj } from "./types/TemplateCreationInterfaces";
import { getPageHeight, getPageWidth } from "./page-util";

export function createStage(canvasDesign: any, fieldValues: string[]) {
    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: getPageWidth(),
        height: getPageHeight(),
        fill: "white"
    });
    layer.add(rect);

    canvasDesign.Rectangles.forEach((shape: shapeObj) => {
        const rect = new Konva.Rect({
            x: shape.x,
            y: shape.y,
            width: 200,
            height: 300,
            fill: "blue",
            opacity: 0.8,
            shadowColor: "black",
            shadowBlur: 10,
            shadowOpacity: 0.6,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
        layer.add(rect);
    });

    canvasDesign.TextInputs.forEach((shape: shapeObj, index: number) => {
        console.log("shape: ", shape)
        console.log("index: ", index)
        console.log("fieldValues: ", fieldValues)
        console.log("fieldValues[index]: ", fieldValues[index])
        const text = new Konva.Text({
            x: shape.x,
            y: shape.y,
            text: fieldValues[index],
            fontSize: 12,
        });
        layer.add(text);
    });

    //Create container for stage 
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    const stage = new Konva.Stage({
        container: "container",
        width: getPageWidth(),
        height: getPageHeight(),
    });
    stage.add(layer);

    return stage.toDataURL();
}
