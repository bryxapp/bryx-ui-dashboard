import Konva from "konva";
import { CanvasDesignData } from "./types/CanvasInterfaces";
import { EstimateFormFields } from "./types/EstimateInterfaces";
import { AddShapesToLayer } from "./shapeManagementUtils";

export const getWebCanvasDimensions = (canvasDesign: CanvasDesignData, scale: number = 1) => {
    // Multiplier to display canvas while designing canvas
    const canvasMultiplier = 96;
    const pageWidth = canvasDesign.pageWidth * canvasMultiplier * scale;
    const pageHeight = canvasDesign.pageHeight * canvasMultiplier * scale;
    return [pageWidth, pageHeight];
}
 
export async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

export async function createImageUrl(canvasDesign: CanvasDesignData, fieldValues: EstimateFormFields) {
    const layer = new Konva.Layer();
    const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign);
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        fill: "white"
    });
    layer.add(rect);

    await AddShapesToLayer(canvasDesign, fieldValues, layer);

    //Create container for stage
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    const stage = new Konva.Stage({
        container: "container",
        width: pageWidth,
        height: pageHeight,
    });
    stage.add(layer);

    const pixelRatio = 1.4;

    const dataUrlSettings = {
        type: "image/png",
        quality: 1,
        pixelRatio: pixelRatio,
        height: pageHeight * pixelRatio,
        width: pageWidth * pixelRatio,
        x: 0,
        y: 0,
    };
    stage.scale({ x: pixelRatio, y: pixelRatio });
    const stageData = stage.toDataURL(dataUrlSettings);
    //Remove container
    document.body.removeChild(container);
    return stageData;
}

// Check if there are differences between the current and the database saved canvas designs
export const isTemplateChanged = (dataBaseCanvasDesign: CanvasDesignData, canvasDesign: CanvasDesignData, friendlyName: string, databaseFriendlyName: string) => {
    const canvasChanged = JSON.stringify(dataBaseCanvasDesign.Shapes) !== JSON.stringify(canvasDesign.Shapes);
    const friendlyNameChanged = friendlyName !== databaseFriendlyName;
    return canvasChanged || friendlyNameChanged;
}