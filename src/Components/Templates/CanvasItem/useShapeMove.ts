import React from 'react';
import Konva from 'konva';
import { CanvasDesignData, EllipseObj, RectangleObj, ShapeObj } from '../../../utils/types/CanvasInterfaces';
import useCanvasGuides from './useCanvasGuides';
import { isImageObject, isInputObject, isSolidShapeObj, isTextObject } from '../../../utils/shapeManagementUtils';
import { getWebCanvasDimensions } from '../../../utils/canvasUtils';

// Assuming necessary interfaces are imported or defined here

const useShapeMove = (
    setCanvasDesign: (newDesign: CanvasDesignData) => void,
    canvasDesign: CanvasDesignData
) => {
    const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign);
    const { getLineGuideStops, getGuides, getObjectSnappingEdges, drawGuides } = useCanvasGuides(pageWidth, pageHeight);

    const handleDragEnd = (e: any) => {
        // Clear all guide lines on the screen
        const layer = e.target.getLayer();
        layer.find(".guid-line").forEach((l: Konva.Shape) => l.destroy());
    
        // Update shape
        const id = e.target.id();
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    
        canvasDesign.Shapes.forEach((shape: ShapeObj, index: number) => {
            if (shape.id === id) {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                    x: Math.round(e.target.x()),
                    y: Math.round(e.target.y()),
                };
            } else {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                };
            }
        });
        setCanvasDesign(updatedCanvasDesign);
    };
    

    const onTransformEnd = (event: any) => {
        const node = event.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
    
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    
        canvasDesign.Shapes.forEach((shape: ShapeObj, index: number) => {
            if (shape.id === node.id()) {
                if (shape.type === "Ellipse") {
                    const ellipseObj = shape as EllipseObj;
                    ellipseObj.x = Math.round(node.x());
                    ellipseObj.y = Math.round(node.y());
                    ellipseObj.radiusX = Math.max(5, Math.round(node.radiusX() * scaleX));
                    ellipseObj.radiusY = Math.max(5, Math.round(node.radiusY() * scaleY));
                    ellipseObj.rotation = Math.round(node.rotation());
                    updatedCanvasDesign.Shapes[index] = ellipseObj;
                } else if (isSolidShapeObj(shape) || isTextObject(shape) || isInputObject(shape) || isImageObject(shape)) {
                    const rectObj = shape as RectangleObj;
                    rectObj.x = Math.round(node.x());
                    rectObj.y = Math.round(node.y());
                    rectObj.width = Math.max(5, Math.round(node.width() * scaleX));
                    rectObj.height = Math.max(5, Math.round(node.height() * scaleY));
                    rectObj.rotation = Math.round(node.rotation());
                    updatedCanvasDesign.Shapes[index] = rectObj;
                }
            }
        });
        setCanvasDesign(updatedCanvasDesign);
    };    

    const handleDragMove = React.useCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            const layer = e.target.getLayer();
            // clear all previous lines on the screen
            layer.find(".guid-line").forEach((l: Konva.Shape) => l.destroy());
            // find possible snapping lines
            const lineGuideStops = getLineGuideStops(e.target as Konva.Shape);
            // find snapping points of current object
            const itemBounds = getObjectSnappingEdges(e.target as Konva.Shape);
            // now find where can we snap current object
            const guides = getGuides(lineGuideStops, itemBounds);

            // do nothing if no snapping
            if (!guides.length) {
                return;
            }

            drawGuides(guides, layer);

            const absPos = e.target.absolutePosition();
            // now force object position
            guides.forEach((lg) => {
                switch (lg.snap) {
                    case "start": {
                        switch (lg.orientation) {
                            case "V": {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case "H": {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case "center": {
                        switch (lg.orientation) {
                            case "V": {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case "H": {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case "end": {
                        switch (lg.orientation) {
                            case "V": {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case "H": {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        },
        [drawGuides, getGuides, getLineGuideStops, getObjectSnappingEdges]
    );

    return { handleDragEnd, onTransformEnd, handleDragMove };
};

export default useShapeMove;
