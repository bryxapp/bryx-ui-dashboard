import { Stage, Layer, Rect, Ellipse, Line, Image, Text } from "react-konva";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, ShapeObj, TextFieldObj } from "../../../../utils/types/CanvasInterfaces"
import styled from '@emotion/styled';
import { getWebCanvasDimensions } from "../../../../utils/canvasUtils";

interface PreviewStageProps {
  canvasDesign: CanvasDesignData;
  scale: number;
}

const PreviewStage = ({ canvasDesign, scale }: PreviewStageProps) => {
  //Page width and height is the same as the paper size. 8.5in x 11in
  const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign, scale);

  //Create a styled div to mimic the look of paper. White drop shadow and rounded corners.


  const PiecePaper = styled('div')({
    width: pageWidth,
    height: pageHeight,
    boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
    borderRadius: '0.1in',
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: 'white',
  });

  return (

    <PiecePaper>
      <Stage
        width={pageWidth}
        height={pageHeight}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          {canvasDesign.Shapes.map((shape: ShapeObj) => {
            switch (shape.type) {
              case "Rectangle":
                const rectangle = shape as RectangleObj;
                return (
                  <Rect
                    key={rectangle.id}
                    id={rectangle.id}
                    x={rectangle.x}
                    y={rectangle.y}
                    width={rectangle.width}
                    height={rectangle.height}
                    fill={rectangle.fill}
                    stroke={rectangle.stroke}
                    strokeWidth={rectangle.strokeWidth}
                    rotation={rectangle.rotation}
                  />)
              case "RoundedRectangle":
                const roundedRectangle = shape as RectangleObj;
                return (
                  <Rect
                    key={roundedRectangle.id}
                    id={roundedRectangle.id}
                    x={roundedRectangle.x}
                    y={roundedRectangle.y}
                    width={roundedRectangle.width}
                    height={roundedRectangle.height}
                    fill={roundedRectangle.fill}
                    stroke={roundedRectangle.stroke}
                    strokeWidth={roundedRectangle.strokeWidth}
                    rotation={roundedRectangle.rotation}
                    cornerRadius={roundedRectangle.cornerRadius}
                  />)
              case "Ellipse":
                const ellipse = shape as EllipseObj;
                return (
                  <Ellipse
                    key={ellipse.id}
                    id={ellipse.id}
                    x={ellipse.x}
                    y={ellipse.y}
                    radiusX={ellipse.radiusX}
                    radiusY={ellipse.radiusY}
                    fill={ellipse.fill}
                    stroke={ellipse.stroke}
                    strokeWidth={ellipse.strokeWidth}
                    rotation={ellipse.rotation}
                  />)
              case "Line":
                const line = shape as LineObj;
                return (
                  <Line
                    key={line.id}
                    id={line.id}
                    x={line.x}
                    y={line.y}
                    points={line.points}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                    rotation={line.rotation}
                  />)
              case 'TextField':
                const text = shape as TextFieldObj;
                return (
                  <Text
                    key={text.id}
                    id={text.id}
                    x={text.x}
                    y={text.y}
                    text={text.value}
                    fontSize={text.fontSize}
                    fontFamily={text.fontFamily}
                    fill={text.fill}
                    rotation={text.rotation}
                    align={text.align}
                  />)
              case 'Image':
                const image = shape as ImageObj;
                const imageSrc = new window.Image();
                imageSrc.src = image.src;
                return (
                  <Image
                    key={image.id}
                    id={image.id}
                    x={image.x}
                    y={image.y}
                    image={imageSrc}
                    width={image.width}
                    height={image.height}
                    rotation={image.rotation}
                  />)
              default:
                return null;
            }
          }
          )}

        </Layer>
      </Stage>
    </PiecePaper>
  );
};

export default PreviewStage;
