import styled from '@emotion/styled';
import { Stage, Layer, Text } from 'react-konva';
import RectangleShape from '../Shapes/RectangleShape';
import { shapeObj } from '../../../../../Interfaces/TemplateCreationInterfaces';
import TextInput from '../Shapes/TextInputShape';
import { getPageHeight, getPageWidth } from '../../../../../utils/page-util';

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


const CanvasStage = ({ shapes, setShapes }: any) => {
    // shapes =  {Rectangles:[], TextInputs:[]}

    const handleDragStart = (e: any) => {
        //Check both Rectangles array and TextInputs array
        const id = e.target.id();
        setShapes({
            Rectangles: shapes.Rectangles.map((shape: any) => {
                return {
                    ...shape,
                    isDragging: shape.id === id,
                };
            }),
            TextInputs: shapes.TextInputs.map((shape: any) => {
                return {
                    ...shape,
                    isDragging: shape.id === id,
                };
            }),
        });
    };

    const handleDragEnd = () => {
        setShapes({
            Rectangles: shapes.Rectangles.map((shape: any) => {
                return {
                    ...shape,
                    isDragging: false,
                };
            }),
            TextInputs: shapes.TextInputs.map((shape: any) => {
                return {
                    ...shape,
                    isDragging: false,
                };
            }),
        });
    };

    return (
        <PiecePaper>
            <Stage width={pageWidth} height={pageHeight}>
                <Layer>
                    {/* Estimatte Header */}
                    <Text text="My New Estimate" x={(pageWidth / 2) - 100} y={20} fontSize={30} fontFamily="Calibri" fill="black" align="center" />
                    {/* Place all rectangle shapes on the canvas */}
                    {shapes.Rectangles.map((shape: shapeObj) => (
                        <RectangleShape key={shape.id} shape={shape} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                    {/* Place all text input shapes on the canvas */}
                    {shapes.TextInputs.map((shape: shapeObj) => (
                        <TextInput key={shape.id} shape={shape} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                    ))}
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;