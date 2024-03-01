import { Stage, Layer, Rect, Ellipse, Line, Image, Text, Group } from "react-konva";
import { CanvasDesignData, EllipseObj, ImageObj, LineObj, RectangleObj, ShapeObj, TextFieldObj, TextTableObj } from "../../../../utils/types/CanvasInterfaces"
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../utils/page-util";
import styled from '@emotion/styled';
import { drawBorders } from "../../../../utils/canvas-util";



interface PreviewStageProps {
  canvasDesign: CanvasDesignData;
  scale: number;
}

const PreviewStage = ({ canvasDesign, scale }: PreviewStageProps) => {
  //Page width and height is the same as the paper size. 8.5in x 11in
  const pageWidth = getWebCanvasWidth() * scale;
  const pageHeight = getWebCanvasHeight() * scale;

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
              case 'TextTable':
                const textTable = shape as TextTableObj;
                //Calculate total table width based on individual cell widths
                const tableWidth = textTable.rows[0].reduce((acc, cell) => acc + cell.width, 0);
                //Calculate total table height based on individual cell heights
                const tableHeight = textTable.rows.reduce((acc, row) => acc + row[0].height, 0);
                return (
                  <>
                    <Group
                      key={textTable.id}
                      x={textTable.x} // Ensure these are correctly set to position the table group
                      y={textTable.y}
                    >
                      <Rect
                        width={tableWidth} 
                        height={tableHeight}
                        fill="transparent" // Using transparent fill to catch click events
                        stroke={textTable.border ? textTable.border.color : 'transparent'}
                        strokeWidth={textTable.border ? textTable.border.width : 0}
                      />
                      {drawBorders(textTable).map((lineProps) => (
                        <Line {...lineProps} />
                      ))}
                      {textTable.rows.map((row, rowIndex) => (
                        row.map((cell, cellIndex) => {
                        // Calculate the X position of the cell based on the widths of all previous cells in the row
                        const cellX = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
                        // Calculate the Y position of the cell based on the heights of all rows above the current row
                        const cellY = textTable.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);
                          if (cell.content?.type === "TextField") {
                            const textField = cell.content as TextFieldObj;
                            return (
                              <Text
                                key={`${textField.id}-${rowIndex}-${cellIndex}`} // Unique key for each text field
                                id={textField.id}
                                x={cellX+5}
                                y={cellY+5}
                                text={textField.value}
                                fontSize={textField.fontSize}
                                fontFamily={textField.fontFamily}
                                fill={textField.fill}
                                rotation={textField.rotation}
                                align={textField.align}
                              />
                            );
                          } else {
                            return null;
                          }
                        })
                      ))}
                    </Group>
                  </>
                );
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
