import { RectangleObj, ShapeObj, EllipseObj, ImageObj, HeadingObj, ParagraphObj, DateInputObj, TableInputObj, InputObj, LongTextInputObj } from "../../../../utils/types/CanvasInterfaces";
import RectangleShape from '../Shapes/SolidShapes/RectangleShape';
import EllipseShape from '../Shapes/SolidShapes/EllipseShape';
import ImageShape from '../Shapes/SolidShapes/ImageShape';
import Heading from '../Shapes/TextFields/Heading';
import Paragraph from '../Shapes/TextFields/Paragraph';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import TableInput from '../Shapes/Inputs/TableInput/TableInput';
import InputContent from "../Shapes/Inputs/Input/InputContent";
import { format } from "date-fns";
import { getTextWidthAndHeight } from "../../../../utils/shapeManagementUtils";


const ShapeRenderer = () => {
    const { canvasDesign } = useCanvasDesignContext();

    return (
        <>
            {canvasDesign.Shapes.map((shape: ShapeObj) => {
                switch (shape.type) {
                    case 'Rectangle':
                        const rectangle = shape as RectangleObj;
                        return (
                            <RectangleShape
                                key={rectangle.id}
                                rectangleObj={rectangle}
                            />
                        );
                    case 'RoundedRectangle':
                        const roundedRectangle = shape as RectangleObj;
                        return (
                            <RectangleShape
                                key={roundedRectangle.id}
                                rectangleObj={roundedRectangle}
                            />
                        );
                    case 'Ellipse':
                        const ellipse = shape as EllipseObj;
                        return (
                            <EllipseShape
                                key={ellipse.id}
                                ellipseObj={ellipse}
                            />
                        );
                    case 'UserImage':
                        const image = shape as ImageObj;
                        return (
                            <ImageShape
                                key={image.id}
                                imageObj={image}
                            />
                        );
                    case 'DateInput':
                        const dateInputObj = shape as DateInputObj;
                        const value = format(new Date(), dateInputObj.dateFormat);
                        const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(dateInputObj,value);
                        dateInputObj.width = contentShapeWidth;
                        dateInputObj.height = contentShapeHeight;
                        return (
                            <InputContent
                                key={shape.id}
                                inputObj={dateInputObj}
                            />
                        );
                    case 'LongTextInput':
                        const longTextInputObj = shape as LongTextInputObj;
                        return (
                            <InputContent
                                key={shape.id}
                                inputObj={longTextInputObj}
                                verticalAlign={longTextInputObj.verticalAlign}
                            />
                        );
                    case 'PhoneInput':
                    case 'EmailInput':
                    case 'ShortTextInput':
                        const inputObj = shape as InputObj;
                        return (
                            <InputContent
                                key={shape.id}
                                inputObj={inputObj}
                            />
                        );
                    case 'Heading':
                        const heading = shape as HeadingObj;
                        return (
                            <Heading
                                key={heading.id}
                                headingObj={heading}
                            />
                        );
                    case 'Paragraph':
                        const paragraph = shape as ParagraphObj;
                        return (
                            <Paragraph
                                key={paragraph.id}
                                paragraphObj={paragraph}
                            />
                        );
                    case 'TableInput':
                        const tableInput = shape as TableInputObj;
                        return (
                            <TableInput
                                key={tableInput.id}
                                tableInputObj={tableInput}
                            />
                        );
                    default:
                        return null;
                }
            })
            }
        </>
    )
}
export default ShapeRenderer;