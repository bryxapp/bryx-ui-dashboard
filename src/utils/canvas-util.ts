import Konva from "konva";
import { shapeObj } from "./types/TemplateCreationInterfaces";
import { getPageHeight, getPageWidth } from "./page-util";

function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function createCanvas(canvasDesign: any) {
    console.log(canvasDesign);
    //Swap out the text input shapes with the text input values

    //Create a new canvas stage with the new canvas design
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    const layer = new Konva.Layer();

    layer.add(new Konva.Rect({
        x: 0,
        y: 0,
        width: getPageHeight(),
        height: getPageWidth(),
        fill: "white"
    }));

    // {/* Place all shapes on the canvas */}

    canvasDesign.Rectangles.forEach((shape: shapeObj) => {
        layer.add(new Konva.Rect({
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
        }));
    });

    canvasDesign.TextInputs.forEach((shape: shapeObj) => {
        layer.add(new Konva.Text({
            x: shape.x,
            y: shape.y,
            text: "USER INPUT",
            fontSize: 12,
        }));
    });

    const stage = new Konva.Stage({
        container: 'container',
        width: getPageHeight(),
        height: getPageWidth(),
    });
    stage.add(layer);
    //Download the canvas stage as a png
    const dataURL = stage.toDataURL();
    downloadURI(dataURL, 'stage.png');
    //Upload the png to the server

    //Create a new estimate with the png url

    //Redirect to the new estimate
    return null;
}