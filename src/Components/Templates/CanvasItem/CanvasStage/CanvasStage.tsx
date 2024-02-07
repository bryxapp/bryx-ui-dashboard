import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import EllipseShape from '../Shapes/EllipseShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { EllipseObj, RectangleObj, TextInputObj, TextFieldObj, LineObj, ImageObj, ShapeObj, CanvasDesignData, ShapeColor } from '../../../../utils/types/CanvasInterfaces';
import ImageShape from '../Shapes/ImageShape';
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { selectShape } from '../../../../utils/functions/CanvasFunctions';
import { useCanvasKeyboardShortcuts } from '../useCanvasKeyboardShortcuts';
import Konva from 'konva';

//Page width and height is the same as the paper size. 8.5in x 11in
const pageWidth = getWebCanvasWidth();
const pageHeight = getWebCanvasHeight();

//Create a styled div to mimic the look of paper. White drop shadow and rounded corners.
const PiecePaper = styled('div')({
    width: pageWidth,
    height: pageHeight,
    boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
    borderRadius: '0.25in',
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: 'white',
});

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


interface CanvasStageProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: ShapeColor;
    setColor: React.SetStateAction<any>;
}


const CanvasStage = ({ canvasDesign, setCanvasDesign, setColor }: CanvasStageProps) => {

    //Parse url to get canvas starter name
    const urlParams = new URLSearchParams(window.location.search);
    const canvasStarterName = urlParams.get('canvasStarterName');

    if (canvasStarterName && canvasDesign.Shapes.length === 0) {
        const canvasStarter = CanvasStarters.find((canvasStarter: CanvasStarterData) => canvasStarter.name === canvasStarterName);
        if (canvasStarter) {
            setCanvasDesign(canvasStarter.canvasDesign);
        }
    }

    const [copiedObject, setCopiedObject] = useState<ShapeObj | RectangleObj | EllipseObj | LineObj | TextInputObj | TextFieldObj | ImageObj | null>(null);
    useCanvasKeyboardShortcuts({ canvasDesign, setCanvasDesign, copiedObject, setCopiedObject });

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null, canvasDesign, setCanvasDesign);
        }
    };

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
        [drawGuides, getGuides, getObjectSnappingEdges]
    );

    return (
        <>
            <PiecePaper>
                <Stage
                    width={pageWidth}
                    height={pageHeight}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                >
                    <Layer>
                        {/* Place all shapes on the canvas */}
                        {canvasDesign.Shapes.map((shape: ShapeObj) => {
                            switch (shape.type) {
                                case 'Rectangle':
                                    const rectangle = shape as RectangleObj;
                                    return (
                                        <RectangleShape
                                            key={rectangle.id}
                                            rectangleObj={rectangle}
                                            handleDragMove={handleDragMove}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={rectangle.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                setColor({ fill: rectangle.fill, stroke: rectangle.stroke })
                                                selectShape(rectangle.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'RoundedRectangle':
                                    const roundedRectangle = shape as RectangleObj;
                                    return (
                                        <RectangleShape
                                            key={roundedRectangle.id}
                                            rectangleObj={roundedRectangle}
                                            handleDragMove={handleDragMove}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={roundedRectangle.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                setColor({ fill: roundedRectangle.fill, stroke: roundedRectangle.stroke })
                                                selectShape(roundedRectangle.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'Ellipse':
                                    const ellipse = shape as EllipseObj;
                                    return (
                                        <EllipseShape
                                            key={ellipse.id}
                                            ellipseObj={ellipse}
                                            handleDragMove={handleDragMove}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={ellipse.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                setColor({ fill: ellipse.fill, stroke: ellipse.stroke })
                                                selectShape(ellipse.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'Line':
                                    const line = shape as LineObj;
                                    return (
                                        <LineShape
                                            key={line.id}
                                            lineObj={line}
                                            handleDragStart={handleDragStart}
                                            handleDragMove={handleDragMove}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={line.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                setColor({ fill: line.stroke, stroke: line.stroke })
                                                selectShape(line.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'TextInput':
                                    const textInput = shape as TextInputObj;
                                    return (
                                        <TextInput
                                            key={textInput.id}
                                            textInputObj={textInput}
                                            handleDragStart={handleDragStart}
                                            handleDragMove={handleDragMove}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={textInput.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                selectShape(textInput.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'TextField':
                                    const textField = shape as TextFieldObj;
                                    return (
                                        <TextField
                                            key={textField.id}
                                            textFieldObj={textField}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            handleDragMove={handleDragMove}
                                            canvasDesign={canvasDesign}
                                            setCanvasDesign={setCanvasDesign}
                                            isSelected={textField.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                selectShape(textField.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'Image':
                                    const image = shape as ImageObj;
                                    return (
                                        <ImageShape
                                            key={image.id}
                                            imageObj={image}
                                            handleDragStart={handleDragStart}
                                            handleDragMove={handleDragMove}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={image.id === canvasDesign.selectedId}
                                            onSelect={() => {
                                                selectShape(image.id, canvasDesign, setCanvasDesign);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </Layer>
                </Stage>
            </PiecePaper>
        </>
    );
};

export default CanvasStage;