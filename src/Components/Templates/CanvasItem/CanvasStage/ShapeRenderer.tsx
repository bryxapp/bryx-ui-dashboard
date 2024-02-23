import React from 'react';
import { CanvasDesignData, RectangleObj, ShapeObj, EllipseObj, LineObj, TextInputObj, TextFieldObj, ImageObj, TextTableObj } from "../../../../utils/types/CanvasInterfaces";
import useShapeMove from "../useShapeMove";
import RectangleShape from '../Shapes/RectangleShape';
import EllipseShape from '../Shapes/EllipseShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField';
import ImageShape from '../Shapes/ImageShape';
import { selectShape } from '../../../../utils/functions/CanvasFunctions';
import TextTable from '../Shapes/TextTable';

interface ShapeRendererProps {
    pageWidth: number;
    pageHeight: number;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    canvasDesign: CanvasDesignData;
    setColor: React.SetStateAction<any>;
}

const ShapeRenderer = ({ pageWidth, pageHeight, setCanvasDesign, canvasDesign, setColor }: ShapeRendererProps) => {

    const { handleDragStart, handleDragEnd, onTransformEnd, handleDragMove } = useShapeMove(pageWidth, pageHeight, setCanvasDesign, canvasDesign);

    return (
        <>
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
                    case 'TextTable':
                        const textTable = shape as TextTableObj;
                        return (
                            <TextTable
                                key={textTable.id}
                                textTableObj={textTable}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                                isSelected={textTable.id === canvasDesign.selectedId}
                                onSelect={(selectedId:string) => {
                                    selectShape(selectedId, canvasDesign, setCanvasDesign);
                                }}
                                handleDragMove={handleDragMove}
                            />
                        )
                    default:
                        return null;
                }
            })
            }
        </>
    )
}
export default ShapeRenderer;