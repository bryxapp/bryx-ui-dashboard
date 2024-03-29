import React from 'react';
import Konva from 'konva';
import { CanvasDesignData, EllipseObj, LineObj, RectangleObj, ShapeObj } from '../../../utils/types/CanvasInterfaces';
import useCanvasGuides from './useCanvasGuides';

// Assuming necessary interfaces are imported or defined here

const useShapeMove = (
    pageWidth: number,
    pageHeight: number,
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>,
    canvasDesign: CanvasDesignData
) => {

    const { getLineGuideStops, getGuides, getObjectSnappingEdges, drawGuides } = useCanvasGuides(pageWidth, pageHeight, setCanvasDesign, canvasDesign);

    const handleDragStart = (e: any) => {
        const id = e.target.id();
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
        canvasDesign.Shapes.forEach((shape: ShapeObj, index: number) => {
            if (shape.id === id) {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                    isDragging: true,
                };
            } else {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                    isDragging: false,
                };
            }
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleDragEnd = (e: any) => {
        // clear all guide lines on the screen
        const layer = e.target.getLayer();
        layer.find(".guid-line").forEach((l: Konva.Shape) => l.destroy());

        //Update shape
        const id = e.target.id();
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };

        canvasDesign.Shapes.forEach((shape: ShapeObj, index: number) => {
            if (shape.id === id) {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                    x: e.target.x(),
                    y: e.target.y(),
                    isDragging: false,
                };
            } else {
                updatedCanvasDesign.Shapes[index] = {
                    ...shape,
                    isDragging: false,
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
                    updatedCanvasDesign.Shapes[index] = {
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        radiusX: Math.max(5, node.radiusX() * scaleX),
                        radiusY: Math.max(5, node.radiusY() * scaleY),
                        rotation: node.rotation(),
                    } as EllipseObj;
                } else if (shape.type === "Line") {
                    updatedCanvasDesign.Shapes[index] = {
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        points: node.points().map((point: number) => point * scaleX),
                        strokeWidth: Math.max(5, node.strokeWidth() * scaleX),
                        rotation: node.rotation(),
                    } as LineObj;
                } else if (shape.type === "Rectangle" || shape.type === "RoundedRectangle" || shape.type === "TextInput" || shape.type === "TextField" || shape.type === "Image") {
                    updatedCanvasDesign.Shapes[index] = {
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                        rotation: node.rotation(),
                    } as RectangleObj;
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

    return { handleDragStart, handleDragEnd, onTransformEnd, handleDragMove };
};

export default useShapeMove;
