import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import CircleShape from '../Shapes/CircleShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField/TextField';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../Utils/page-util';
import { circleObj, rectangleObj, textInputObj, textFieldObj } from '../../../../Utils/types/ShapeInterfaces';
import { ChromePicker } from 'react-color';

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


const CanvasStage = ({ canvasDesign, setCanvasDesign }: any) => {

    const [selectedId, setSelectedShape] = useState<string | null>(null);
    const [color, setColor] = useState('#000000');

    const selectShape = (id: string | null) => {
        setSelectedShape(id);
        setCanvasDesign({
            ...canvasDesign,
            selectedId: id,
        });
    };


    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const handleDragStart = (e: any) => {
        const id = e.target.id();
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach(shapeType => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                return {
                    ...shape,
                    isDragging: shape.id === id,
                };
            });
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleDragEnd = (e: any) => {
        const id = e.target.id();
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach(shapeType => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                if (shape.id === id) {
                    return {
                        ...shape,
                        x: e.target.x(),
                        y: e.target.y(),
                        isDragging: false,
                    };
                } else {
                    return {
                        ...shape,
                        isDragging: false,
                    };
                }
            });
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const onTransformEnd = (event: any) => {
        const node = event.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);

        const updatedCanvasDesign: any = {};

        Object.keys(canvasDesign).forEach((shapeType: string) => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                if (shape.id !== node.id()) {
                    return shape;
                }
                const updatedShape = {
                    ...shape,
                    x: node.x(),
                    y: node.y(),
                    rotation: node.rotation(),
                };

                if (node.radius) { // Circle
                    updatedShape.radius = Math.max(5, node.radius() * scaleX);
                } else if (node.points) { // Line
                    updatedShape.points = node.points().map((point: number) => point * scaleX);
                    updatedShape.strokeWidth = Math.max(5, node.strokeWidth() * scaleX);
                } else if (node.width) { // Rectangle
                    updatedShape.width = Math.max(5, node.width() * scaleX);
                    updatedShape.height = Math.max(node.height() * scaleY);
                }

                return updatedShape;
            });
        });

        setCanvasDesign(updatedCanvasDesign);
    };

    const onColorChange = (color: any) => {
        setColor(color.hex);
        const updatedCanvasDesign: any = {};

        Object.keys(canvasDesign).forEach((shapeType: string) => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                if (shape.id !== selectedId) {
                    return shape;
                }
                const updatedShape = {
                    ...shape,
                    fill: color.hex,
                };
                return updatedShape;
            });
        });

        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedShape = canvasDesign.Rectangles.concat(canvasDesign.Circles, canvasDesign.Lines, canvasDesign.TextInputs).find((shape: any) => shape.id === selectedId);

    return (
        <>
            {/* Add a color picker for the selected shape */}
            <div style={{ position: 'relative' }}>
                {/* Add a color picker for the selected shape */}
                {selectedShape && (
                    <div style={{ position: 'absolute', top: 0, right: -225 }}>
                        <ChromePicker color={color} onChange={onColorChange} />
                    </div>
                )}
            </div>
            <PiecePaper>
                <Stage width={pageWidth} height={pageHeight}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}>
                    <Layer>
                        {/* Place all rectangle shapes on the canvas */}
                        {canvasDesign.Rectangles.map((rectangleObj: rectangleObj) => (
                            <RectangleShape
                                key={rectangleObj.id}
                                rectangleObj={rectangleObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={rectangleObj.id === selectedId}
                                onSelect={() => {
                                    setColor(rectangleObj.fill)
                                    selectShape(rectangleObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                        {/* Place all circle shapes on the canvas */}
                        {canvasDesign.Circles.map((circleObj: circleObj) => (
                            <CircleShape
                                key={circleObj.id}
                                circleObj={circleObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={circleObj.id === selectedId}
                                onSelect={() => {
                                    setColor(circleObj.fill)
                                    selectShape(circleObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                        {/* Place all line shapes on the canvas */}
                        {canvasDesign.Lines.map((lineObj: any) => (
                            <LineShape
                                key={lineObj.id}
                                lineObj={lineObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={lineObj.id === selectedId}
                                onSelect={() => {
                                    setColor(lineObj.fill)
                                    selectShape(lineObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                        {/* Place all text inputs on the canvas */}
                        {canvasDesign.TextInputs.map((textInputObj: textInputObj) => (
                            <TextInput key={textInputObj.id} textInputObj={textInputObj} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                        ))}
                        {/* Place all text fields on the canvas */}
                        {canvasDesign.TextFields.map((textFieldObj: textFieldObj) => (
                            <TextField
                                key={textFieldObj.id}
                                textFieldObj={textFieldObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                            />
                        ))}
                    </Layer>
                </Stage>
            </PiecePaper>
        </>
    );
};

export default CanvasStage;


