import styled from '@emotion/styled';
import { Stage, Layer } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import { shapeObj } from '../../../../Interfaces/TemplateCreationInterfaces';
import TextInput from '../Shapes/TextInputShape';
import { getPageHeight, getPageWidth } from '../../../../utils/page-util';

//Page width and height is the same as the paper size. 8.5in x 11in
const pageWidth = getPageHeight();
const pageHeight = getPageWidth();


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
    // shapes =  {Rectangles:[], TextInputs:[]}

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
                    {canvasDesign.Rectangles.map((shape: shapeObj) => (
                        <RectangleShape key={shape.id} shape={shape} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                    {/* Place all text input shapes on the canvas */}
                    {canvasDesign.TextInputs.map((shape: shapeObj) => (
                        <TextInput key={shape.id} shape={shape} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;