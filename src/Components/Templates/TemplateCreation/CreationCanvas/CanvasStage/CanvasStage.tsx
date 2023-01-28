import styled from '@emotion/styled';
import React from 'react';
import { Stage, Layer, Star, Text, Rect } from 'react-konva';

//Page width and height is the same as the paper size. 8.5in x 11in
const pageWidth = 8.5 * 96;
const pageHeight = 11 * 96;

function generateShapes() {
    //Generate 10 random shapes whose x and y are always greater than 20 and less than the page width or height.
    //This is to ensure that the shapes are always visible on the page
    return [...Array(10)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * (pageWidth - 40) + 20,
        y: Math.random() * (pageHeight - 40) + 20,
        rotation: Math.random() * 180,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();

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

const CanvasStage = () => {
    const [stars, setStars] = React.useState(INITIAL_STATE);
    const handleDragStart = (e: any) => {
        const id = e.target.id();
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                };
            })
        );

    };
    const handleDragEnd = () => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                };
            })
        );
    };

    return (
        <PiecePaper>
            <Stage width={pageWidth} height={pageHeight}>
                <Layer>
                    <Text text="My New Estimate" x={(pageWidth / 2) - 100} y={20} fontSize={30} fontFamily="Calibri" fill="black" align="center" />
                    {stars.map((star) => (
                        <Star
                            key={star.id}
                            id={star.id}
                            x={star.x}
                            y={star.y}
                            numPoints={5}
                            innerRadius={20}
                            outerRadius={40}
                            fill="#89b717"
                            opacity={0.8}
                            draggable
                            rotation={star.rotation}
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOpacity={0.6}
                            shadowOffsetX={star.isDragging ? 10 : 5}
                            shadowOffsetY={star.isDragging ? 10 : 5}
                            scaleX={star.isDragging ? 1.2 : 1}
                            scaleY={star.isDragging ? 1.2 : 1}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                    <Rect
                        x={20}
                        y={50}
                        width={100}
                        height={100}
                        fill="blue"
                        shadowBlur={10}
                    />
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;