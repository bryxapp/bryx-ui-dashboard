import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import CircleShape from '../Shapes/CircleShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { CircleObj, RectangleObj, TextInputObj, TextFieldObj, LineObj, ImageObj, ShapeObj } from '../../../../utils/types/CanvasInterfaces';
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
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={rectangle.id === selectedId}
                                            onSelect={() => {
                                                setColor(rectangle.fill)
                                                selectShape(rectangle.id);
                                            }}
                                            onTransformEnd={onTransformEnd}
                                        />
                                    );
                                case 'Circle':
                                    const circle = shape as CircleObj;
                                    return (
                                        <CircleShape
                                            key={circle.id}
                                            circleObj={circle}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={circle.id === selectedId}
                                            onSelect={() => {
                                                setColor(circle.fill)
                                                selectShape(circle.id);
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
                                            handleDragEnd={handleDragEnd}
                                            isSelected={line.id === selectedId}
                                            onSelect={() => {
                                                setColor(line.stroke)
                                                selectShape(line.id);
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
                                            handleDragEnd={handleDragEnd}
                                            isSelected={textInput.id === selectedId}
                                            onSelect={() => {
                                                selectShape(textInput.id);
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
                                            canvasDesign={canvasDesign}
                                            setCanvasDesign={setCanvasDesign}
                                            isSelected={textField.id === selectedId}
                                            onSelect={() => {
                                                selectShape(textField.id);
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
                                            handleDragEnd={handleDragEnd}
                                            isSelected={image.id === selectedId}
                                            onSelect={() => {
                                                selectShape(image.id);
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


