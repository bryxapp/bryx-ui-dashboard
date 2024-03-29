import React from 'react';
import Konva from 'konva';

// Assuming necessary interfaces are imported or defined here

const useCanvasGuides = (
    pageWidth: number,
    pageHeight: number,
) => {

    const GUIDELINE_OFFSET = 5;

    type Snap = "start" | "center" | "end";
    type SnappingEdges = {
        vertical: Array<{
            guide: number;
            offset: number;
            snap: Snap;
        }>;
        horizontal: Array<{
            guide: number;
            offset: number;
            snap: Snap;
        }>;
    };

    const getLineGuideStops = (currentShape: Konva.Shape) => {
        // we can snap to stage borders and the center of the stage
        const vertical = [0, pageWidth / 2, pageWidth];
        const horizontal = [0, pageHeight / 2, pageHeight];
        //get stage 
        var shapes = currentShape.getStage()?.children?.at(0)?.children;
        if (!shapes) return { vertical: [], horizontal: [] };

        // and we snap over edges and center of each object on the canvas
        shapes.forEach((shape) => {
            if (shape.attrs.id === currentShape.attrs.id) {
                return;
            }
            const boundingBox = shape.getClientRect();

            // and we can snap to all edges of shapes
            vertical.push(boundingBox.x, boundingBox.x + boundingBox.width, boundingBox.x + boundingBox.width / 2);
            horizontal.push(boundingBox.y, boundingBox.y + boundingBox.height, boundingBox.y + boundingBox.height / 2);
        });

        return {
            vertical,
            horizontal
        };
    };

    const getObjectSnappingEdges = React.useCallback(
        (node: Konva.Shape): SnappingEdges => {
            const box = node.getClientRect();
            const absPos = node.absolutePosition();

            return {
                vertical: [
                    {
                        guide: Math.round(box.x),
                        offset: Math.round(absPos.x - box.x),
                        snap: "start"
                    },
                    {
                        guide: Math.round(box.x + box.width / 2),
                        offset: Math.round(absPos.x - box.x - box.width / 2),
                        snap: "center"
                    },
                    {
                        guide: Math.round(box.x + box.width),
                        offset: Math.round(absPos.x - box.x - box.width),
                        snap: "end"
                    }
                ],
                horizontal: [
                    {
                        guide: Math.round(box.y),
                        offset: Math.round(absPos.y - box.y),
                        snap: "start"
                    },
                    {
                        guide: Math.round(box.y + box.height / 2),
                        offset: Math.round(absPos.y - box.y - box.height / 2),
                        snap: "center"
                    },
                    {
                        guide: Math.round(box.y + box.height),
                        offset: Math.round(absPos.y - box.y - box.height),
                        snap: "end"
                    }
                ]
            };
        },
        []
    );

    const getGuides = React.useCallback(
        (
            lineGuideStops: ReturnType<typeof getLineGuideStops>,
            itemBounds: ReturnType<typeof getObjectSnappingEdges>
        ) => {
            const resultV: Array<{
                lineGuide: number;
                diff: number;
                snap: Snap;
                offset: number;
            }> = [];

            const resultH: Array<{
                lineGuide: number;
                diff: number;
                snap: Snap;
                offset: number;
            }> = [];

            lineGuideStops.vertical.forEach((lineGuide) => {
                itemBounds.vertical.forEach((itemBound) => {
                    const diff = Math.abs(lineGuide - itemBound.guide);
                    if (diff < GUIDELINE_OFFSET) {
                        resultV.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset
                        });
                    }
                });
            });

            lineGuideStops.horizontal.forEach((lineGuide) => {
                itemBounds.horizontal.forEach((itemBound) => {
                    const diff = Math.abs(lineGuide - itemBound.guide);
                    if (diff < GUIDELINE_OFFSET) {
                        resultH.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset
                        });
                    }
                });
            });

            const guides: Array<{
                lineGuide: number;
                offset: number;
                orientation: "V" | "H";
                snap: "start" | "center" | "end";
            }> = [];

            const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
            const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

            if (minV) {
                guides.push({
                    lineGuide: minV.lineGuide,
                    offset: minV.offset,
                    orientation: "V",
                    snap: minV.snap
                });
            }

            if (minH) {
                guides.push({
                    lineGuide: minH.lineGuide,
                    offset: minH.offset,
                    orientation: "H",
                    snap: minH.snap
                });
            }

            return guides;
        },
        []
    );

    const drawGuides = React.useCallback(
        (guides: ReturnType<typeof getGuides>, layer: Konva.Layer) => {
            guides.forEach((lg) => {
                if (lg.orientation === "H") {
                    const line = new Konva.Line({
                        points: [-6000, 0, 6000, 0],
                        stroke: "rgb(0, 161, 255)",
                        strokeWidth: 1,
                        name: "guid-line",
                        dash: [4, 6]
                    });
                    layer.add(line);
                    line.absolutePosition({
                        x: 0,
                        y: lg.lineGuide
                    });
                } else if (lg.orientation === "V") {
                    const line = new Konva.Line({
                        points: [0, -6000, 0, 6000],
                        stroke: "rgb(0, 161, 255)",
                        strokeWidth: 1,
                        name: "guid-line",
                        dash: [4, 6]
                    });
                    layer.add(line);
                    line.absolutePosition({
                        x: lg.lineGuide,
                        y: 0
                    });
                }
            });
        },
        []
    );

    return { getLineGuideStops, getGuides, getObjectSnappingEdges, drawGuides };
};

export default useCanvasGuides;
