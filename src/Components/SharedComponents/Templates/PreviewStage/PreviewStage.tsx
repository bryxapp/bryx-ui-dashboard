import { Stage, Layer, Rect, Ellipse, Image, Text, Group } from "react-konva";
import { CanvasDesignData, DateInputObj, EllipseObj, ImageObj, InputObj, RectangleObj, ShapeObj, TextObj } from "../../../../utils/types/CanvasInterfaces"
import { getWebCanvasDimensions } from "../../../../utils/canvasUtils";
import PiecePaper from "../../PiecePaper/PiecePaper";
import { EstimateFormFields } from "../../../../utils/types/EstimateInterfaces";
import { getXAlignment, getYAlignment } from "../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { format } from "date-fns";
import { getTextWidthAndHeight } from "../../../../utils/shapeManagementUtils";

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
              case 'UserImage':
              case 'StockImage':
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
                const inputObj = shape as InputObj;
                const labelInputObj = inputObj.label;
                const contentInputObj = inputObj.content;
                const value = formInputs ? formInputs[inputObj.id].value : '';
                const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(labelInputObj);
                const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(contentInputObj);
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
              case 'DateInput':
                const dateInputObj = shape as DateInputObj;
                const dateLabelInputObj = dateInputObj.label;
                const dateContentInputObj = dateInputObj.content;
                const dateString = formInputs ? formInputs[dateInputObj.id].value : '';
                const val = dateString ? format(new Date(dateString), dateInputObj.dateFormat) : '';
                const [datelabelShapeWidth, datelabelShapeHeight] = getTextWidthAndHeight(dateLabelInputObj);
                const [datecontentShapeWidth, datecontentShapeHeight] = getTextWidthAndHeight(dateContentInputObj);
                const datecontainerWidth = Math.max(datelabelShapeWidth, datecontentShapeWidth);
                return (
                  <Group
                    key={dateInputObj.id}
                    id={dateInputObj.id}
                    x={dateInputObj.x}
                    y={dateInputObj.y}
                    rotation={dateInputObj.rotation}
                  >
                    {dateInputObj.hasLabel &&
                      <Text
                        x={getXAlignment(dateLabelInputObj, datecontainerWidth)}
                        y={getYAlignment(datecontentShapeHeight)}
                        text={dateLabelInputObj.value}
                        fontSize={dateLabelInputObj.fontSize}
                        fontFamily={dateLabelInputObj.fontFamily}
                        fill={dateLabelInputObj.fill}
                        align={dateLabelInputObj.align}
                      />
                    }
                    <Text
                      x={getXAlignment(dateContentInputObj, datecontainerWidth)}
                      y={getYAlignment(datecontentShapeHeight) + datelabelShapeHeight + (dateLabelInputObj.fontSize / 10)}
                      text={val}
                      fontSize={dateContentInputObj.fontSize}
                      fontFamily={dateContentInputObj.fontFamily}
                      fill={dateContentInputObj.fill}
                      align={dateContentInputObj.align}
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
