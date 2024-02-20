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
import useShapeMove from '../useShapeMove';

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
    const { handleDragStart, handleDragEnd, onTransformEnd, handleDragMove } = useShapeMove(pageWidth, pageHeight, setCanvasDesign, canvasDesign);

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null, canvasDesign, setCanvasDesign);
        }
    };

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