import { Stage, Layer, Rect, Ellipse, Image, Text, Group } from "react-konva";
import { CanvasDesignData, EllipseObj, ImageObj, InputObj, RectangleObj, ShapeObj, TextObj } from "../../../../utils/types/CanvasInterfaces"
import { getWebCanvasDimensions } from "../../../../utils/canvasUtils";
import PiecePaper from "../../PiecePaper/PiecePaper";
import { EstimateFormFields } from "../../../../utils/types/EstimateInterfaces";
import { createTempTextKonvaShape, getXAlignment, getYAlignment } from "../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";

interface PreviewStageProps {
  canvasDesign: CanvasDesignData;
  scale: number;
  formInputs?: EstimateFormFields;
}

const PreviewStage = ({ canvasDesign, scale, formInputs }: PreviewStageProps) => {
  //Page width and height is the same as the paper size. 8.5in x 11in
  const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign, scale);

  //Create a styled div to mimic the look of paper. White drop shadow and rounded corners.

  return (
    <PiecePaper pageHeight={pageHeight} pageWidth={pageWidth}>
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
              case 'Heading':
              case 'Paragraph':
                const textObj = shape as TextObj;
                return (
                  <Text
                    key={textObj.id}
                    id={textObj.id}
                    x={textObj.x}
                    y={textObj.y}
                    text={textObj.value}
                    fontSize={textObj.fontSize}
                    fontFamily={textObj.fontFamily}
                    fill={textObj.fill}
                    rotation={textObj.rotation}
                    align={textObj.align}
                  />)
              case 'PhoneInput':
              case 'EmailInput':
              case 'ShortTextInput':
              case 'LongTextInput':
              case 'DateInput':
                const inputObj = shape as InputObj;
                const labelInputObj = inputObj.label;
                const contentInputObj = inputObj.content;
                const value = formInputs ? formInputs[inputObj.id].value : '';

                //Create Label Text Shape for measurements
                const tempTextShapeLabel = createTempTextKonvaShape(labelInputObj);
                const labelShapeWidth = tempTextShapeLabel.width();
                const labelShapeHeight = tempTextShapeLabel.height();
                // Create Content Text Shape for measurements
                const tempTextShapeContent = createTempTextKonvaShape(contentInputObj);
                const contentShapeWidth = tempTextShapeContent.width();
                const contentShapeHeight = tempTextShapeContent.height();
                //Container Measurements 
                const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);
                return (
                  <Group
                    key={inputObj.id}
                    id={inputObj.id}
                    x={inputObj.x}
                    y={inputObj.y}
                    rotation={inputObj.rotation}
                  >
                    {inputObj.hasLabel &&
                      <Text
                        x={getXAlignment(labelInputObj, containerWidth)}
                        y={getYAlignment(contentShapeHeight)}
                        text={labelInputObj.value}
                        fontSize={labelInputObj.fontSize}
                        fontFamily={labelInputObj.fontFamily}
                        fill={labelInputObj.fill}
                        align={labelInputObj.align}
                      />
                    }
                    <Text
                      x={getXAlignment(contentInputObj, containerWidth)}
                      y={getYAlignment(contentShapeHeight) + labelShapeHeight + (labelInputObj.fontSize / 10)}
                      text={value}
                      fontSize={contentInputObj.fontSize}
                      fontFamily={contentInputObj.fontFamily}
                      fill={contentInputObj.fill}
                      align={contentInputObj.align}
                    />
                  </Group>
                );
              case 'TableInput':
                //TODO: Implement TableInput
                return null;
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
