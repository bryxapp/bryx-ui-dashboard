import React from 'react';
import Konva from 'konva';
import { CanvasDesignData, ShapeObj } from '../../../utils/types/CanvasInterfaces';
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
        let foundAndUpdated = false;
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            // Skip any further updates after the first match is found and updated
            if (foundAndUpdated) return shape;
            if (shape.id === id) {
                foundAndUpdated = true;
                return {
                    ...shape,
                    x: Math.round(e.target.x()),
                    y: Math.round(e.target.y()),
                };
            }
            return shape;
        });

        // Update the canvasDesign only if an update was made
        if (foundAndUpdated) {
            setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
        }
    };
    

    const onTransformEnd = (event: any) => {
        const node = event.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
    
        const id = node.id();
        let foundAndUpdated = false;
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (foundAndUpdated) return shape;
            if (shape.id === id) {
                foundAndUpdated = true;
                if (shape.type === "Ellipse") {
                    return {
                        ...shape,
                        x: Math.round(node.x()),
                        y: Math.round(node.y()),
                        radiusX: Math.max(5, Math.round(node.radiusX() * scaleX)),
                        radiusY: Math.max(5, Math.round(node.radiusY() * scaleY)),
                        rotation: Math.round(node.rotation())
                    };
                } else if (isSolidShapeObj(shape) || isTextObject(shape) || isInputObject(shape) || isImageObject(shape)) {
                    return {
                        ...shape,
                        x: Math.round(node.x()),
                        y: Math.round(node.y()),
                        width: Math.max(5, Math.round(node.width() * scaleX)),
                        height: Math.max(5, Math.round(node.height() * scaleY)),
                        rotation: Math.round(node.rotation())
                    };
                }
            }
            return shape;
        });
    
        if (foundAndUpdated) {
            setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
        }
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
