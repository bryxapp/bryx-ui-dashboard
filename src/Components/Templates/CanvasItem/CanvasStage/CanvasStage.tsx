import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import CircleShape from '../Shapes/CircleShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { CircleObj, RectangleObj, TextInputObj, TextFieldObj, LineObj, ImageObj } from '../../../../utils/types/CanvasInterfaces';
import ImageShape from '../Shapes/ImageShape';

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
    canvasDesign: any;
    setCanvasDesign: any;
    color: string;
    setColor: any;
    selectedId: string | null;
    setSelectedId: any;
}


const CanvasStage = ({ canvasDesign, setCanvasDesign, color, setColor, selectedId, setSelectedId }: CanvasStageProps) => {

    const selectShape = (id: string | null) => {
        setSelectedId(id);
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
const image = new window.Image();
image.src = 'https://konvajs.org/assets/yoda.jpg';

    return (
        <>
            <PiecePaper>
                <Stage width={pageWidth} height={pageHeight}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}>
                    <Layer>
                        {/* Place all rectangle shapes on the canvas */}
                        {canvasDesign.Rectangles.map((rectangleObj: RectangleObj) => (
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
                        {canvasDesign.Circles.map((circleObj: CircleObj) => (
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
                        {canvasDesign.Lines.map((lineObj: LineObj) => (
                            <LineShape
                                key={lineObj.id}
                                lineObj={lineObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={lineObj.id === selectedId}
                                onSelect={() => {
                                    setColor(lineObj.stroke)
                                    selectShape(lineObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                        {/* Place all text inputs on the canvas */}
                        {canvasDesign.TextInputs.map((textInputObj: TextInputObj) => (
                            <TextInput
                                key={textInputObj.id}
                                textInputObj={textInputObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={textInputObj.id === selectedId}
                                onSelect={() => {
                                    selectShape(textInputObj.id);
                                }}
                                onTransformEnd={onTransformEnd} />
                        ))}
                        {/* Place all text fields on the canvas */}
                        {canvasDesign.TextFields.map((textFieldObj: TextFieldObj) => (
                            <TextField
                                key={textFieldObj.id}
                                textFieldObj={textFieldObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                                isSelected={textFieldObj.id === selectedId}
                                onSelect={() => {
                                    selectShape(textFieldObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                        {/* Place all images on the canvas */}
                        {canvasDesign.Images.map((imageObj: ImageObj) => (
                            <ImageShape
                                key={imageObj.id}
                                imageObj={imageObj}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                isSelected={imageObj.id === selectedId}
                                onSelect={() => {
                                    selectShape(imageObj.id);
                                }}
                                onTransformEnd={onTransformEnd}
                            />
                        ))}
                    </Layer>
                </Stage>
            </PiecePaper>
        </>
    );
};

export default CanvasStage;


