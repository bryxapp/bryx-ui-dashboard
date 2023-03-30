import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import EllipseShape from '../Shapes/EllipseShape';
import LineShape from '../Shapes/LineShape';
import TextInput from '../Shapes/TextInput';
import TextField from '../Shapes/TextField';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { EllipseObj, RectangleObj, TextInputObj, TextFieldObj, LineObj, ImageObj, ShapeObj, CanvasDesignData } from '../../../../utils/types/CanvasInterfaces';
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
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: string;
    setColor: React.SetStateAction<any>;
    selectedId: string | null;
    setSelectedId: React.SetStateAction<any>;
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
                } else if (shape.type === "Rectangle" || shape.type === "TextInput" || shape.type === "TextField" || shape.type === "Image") {
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
                                case 'Ellipse':
                                    const ellipse = shape as EllipseObj;
                                    return (
                                        <EllipseShape
                                            key={ellipse.id}
                                            ellipseObj={ellipse}
                                            handleDragStart={handleDragStart}
                                            handleDragEnd={handleDragEnd}
                                            isSelected={ellipse.id === selectedId}
                                            onSelect={() => {
                                                setColor(ellipse.fill)
                                                selectShape(ellipse.id);
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