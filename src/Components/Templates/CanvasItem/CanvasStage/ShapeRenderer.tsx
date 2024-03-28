import React from 'react';
import { CanvasDesignData, RectangleObj, ShapeObj, EllipseObj, LineObj, ImageObj, PhoneInputObj, EmailInputObj, HeadingObj, ParagraphObj } from "../../../../utils/types/CanvasInterfaces";
import useShapeMove from "../useShapeMove";
import RectangleShape from '../Shapes/RectangleShape';
import EllipseShape from '../Shapes/EllipseShape';
import LineShape from '../Shapes/LineShape';
import ImageShape from '../Shapes/ImageShape';
import { selectShape } from '../../../../utils/shapeManagementUtils';
import PhoneInput from '../Shapes/Inputs/PhoneInput';
import EmailInput from '../Shapes/Inputs/EmailInput';
import Heading from '../Shapes/TextFields/Heading';
import Paragraph from '../Shapes/TextFields/Paragraph';

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
                    case 'PhoneInput':
                        const phoneInput = shape as PhoneInputObj;
                        return (
                            <PhoneInput
                                key={phoneInput.id}
                                phoneInputObj={phoneInput}
                                handleDragStart={handleDragStart}
                                handleDragMove={handleDragMove}
                                handleDragEnd={handleDragEnd}
                                isSelected={phoneInput.id === canvasDesign.selectedId}
                                onSelect={() => {
                                    selectShape(phoneInput.id, canvasDesign, setCanvasDesign);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        );
                    case 'EmailInput':
                        const emailInput = shape as EmailInputObj;
                        return (
                            <EmailInput
                                key={emailInput.id}
                                emailInputObj={emailInput}
                                handleDragStart={handleDragStart}
                                handleDragMove={handleDragMove}
                                handleDragEnd={handleDragEnd}
                                isSelected={emailInput.id === canvasDesign.selectedId}
                                onSelect={() => {
                                    selectShape(emailInput.id, canvasDesign, setCanvasDesign);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        );
                    case 'Heading':
                        const heading = shape as HeadingObj;
                        return (
                            <Heading
                                key={heading.id}
                                headingObj={heading}
                                handleDragStart={handleDragStart}
                                handleDragMove={handleDragMove}
                                handleDragEnd={handleDragEnd}
                                isSelected={heading.id === canvasDesign.selectedId}
                                onSelect={() => {
                                    selectShape(heading.id, canvasDesign, setCanvasDesign);
                                }}
                                onTransformEnd={onTransformEnd}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                            />
                        );
                    case 'Paragraph':
                        const paragraph = shape as ParagraphObj;
                        return (
                            <Paragraph
                                key={paragraph.id}
                                paragraphObj={paragraph}
                                handleDragStart={handleDragStart}
                                handleDragMove={handleDragMove}
                                handleDragEnd={handleDragEnd}
                                isSelected={paragraph.id === canvasDesign.selectedId}
                                onSelect={() => {
                                    selectShape(paragraph.id, canvasDesign, setCanvasDesign);
                                }}
                                onTransformEnd={onTransformEnd}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                            />
                        );
                    default:
                        return null;
                }
            })
            }
        </>
    )
}
export default ShapeRenderer;