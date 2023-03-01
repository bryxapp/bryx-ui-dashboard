import styled from '@emotion/styled';
import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import CircleShape from '../Shapes/CircleShape';
import TextInput from '../Shapes/TextInputShape';
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

    return (
        <PiecePaper>
            <Stage width={pageWidth} height={pageHeight}>
                <Layer>
                    {/* Place all rectangle shapes on the canvas */}
                    {canvasDesign.Rectangles.map((rectangleObj: rectangleObj) => (
                        <RectangleShape key={rectangleObj.id} rectangleObj={rectangleObj} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                    {/* Place all circle shapes on the canvas */}
                    {canvasDesign.Circles.map((circleObj: circleObj) => (
                        <CircleShape key={circleObj.id} circleObj={circleObj} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                    {/* Place all text input shapes on the canvas */}
                    {canvasDesign.TextInputs.map((textInputObj: textObj) => (
                        <TextInput key={textInputObj.id} textInputObj={textInputObj} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;