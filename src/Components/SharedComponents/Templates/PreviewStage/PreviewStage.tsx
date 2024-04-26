import { Stage, Layer } from "react-konva";
import { CanvasDesignData, DateInputObj, EllipseObj, EmailInputObj, HeadingObj, ImageObj, LongTextInputObj, ParagraphObj, PhoneInputObj, RectangleObj, ShapeObj, TableInputObj } from "../../../../utils/types/CanvasInterfaces"
import { getWebCanvasDimensions } from "../../../../utils/canvasUtils";
import PiecePaper from "../../PiecePaper/PiecePaper";
import { EstimateFormFields } from "../../../../utils/types/EstimateInterfaces";
import PreviewRectangle from "./PreviewShapes/PreviewRectangle";
import PreviewRoundedRectangle from "./PreviewShapes/PreviewRoundedRectangle";
import PreviewEllipse from "./PreviewShapes/PreviewEllipse";
import PreviewImage from "./PreviewShapes/PreviewImage";
import PreviewHeading from "./PreviewShapes/PreviewHeading";
import PreviewParagraph from "./PreviewShapes/PreviewParagraph";
import PreviewPhoneInput from "./PreviewShapes/PreviewPhoneInput";
import PreviewEmailInput from "./PreviewShapes/PreviewEmailInput";
import PreviewDateInput from "./PreviewShapes/PreviewDateInput";
import PreviewLongTextInput from "./PreviewShapes/PreviewLongTextInput";
import PreviewTableInput from "./PreviewShapes/PreviewTableInput";

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
                return <PreviewRectangle rectangleObj={shape as RectangleObj} />
              case "RoundedRectangle":
                return <PreviewRoundedRectangle roundedRectangleObj={shape as RectangleObj} />
              case "Ellipse":
                return <PreviewEllipse EllipseObj={shape as EllipseObj} />
              case 'UserImage':
                return <PreviewImage ImageObj={shape as ImageObj} />
              case 'Heading':
                return <PreviewHeading HeadingObj={shape as HeadingObj} />
              case 'Paragraph':
                return <PreviewParagraph ParagraphObj={shape as ParagraphObj} />
              case 'PhoneInput':
                return <PreviewPhoneInput PhoneInputObj={shape as PhoneInputObj} formInputs={formInputs} />
              case 'EmailInput':
                return <PreviewEmailInput EmailInputObj={shape as EmailInputObj} formInputs={formInputs} />
              case 'ShortTextInput':
              case 'LongTextInput':
                return <PreviewLongTextInput LongTextInputObj={shape as LongTextInputObj} formInputs={formInputs} />
              case 'DateInput':
                return <PreviewDateInput DateInputObj={shape as DateInputObj} formInputs={formInputs} />
              case 'TableInput':
                return <PreviewTableInput tableInputObj={shape as TableInputObj} formInputs={formInputs} />
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
