import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import CircleShape from '../Shapes/CircleShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInputShape';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { circleObj, rectangleObj, textObj } from '../../../../utils/types/ShapeInterfaces';

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

    const [selectedId, selectShape] = useState<string | null>(null);

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

    const onTransformEnd = (e: any) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach(shapeType => {
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                if (shape.id === node.id()) {
                    if (node.radius) {
                        return {
                            ...shape,
                            x: node.x(),
                            y: node.y(),
                            rotation: node.rotation(),
                            radius: Math.max(5, node.radius() * scaleX),
                        };
                    }
                    else if (node.points) {
                        let points = node.points();
                        points = points.map((point: any) => {
                            return point * scaleX;
                        });

                        return {
                            ...shape,
                            x: node.x(),
                            y: node.y(),
                            rotation: node.rotation(),
                            points: points,
                            strokeWidth: Math.max(5, node.strokeWidth() * scaleX),
                        };
                    }
                    else if (node.width) {
                        return {
                            ...shape,
                            x: node.x(),
                            y: node.y(),
                            rotation: node.rotation(),
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY),
                        };
                    }

                } else {
                    return shape;
                }
                return shape;
            });
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
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
                            onSelect={() => { selectShape(rectangleObj.id); }}
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
                            onSelect={() => { selectShape(circleObj.id); }}
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
                            onSelect={() => { selectShape(lineObj.id); }}
                            onTransformEnd={onTransformEnd}
                        />
                    ))}
                    {/* Place all text input fields on the canvas */}
                    {canvasDesign.TextInputs.map((textInputObj: textObj) => (
                        <TextInput key={textInputObj.id} textInputObj={textInputObj} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;