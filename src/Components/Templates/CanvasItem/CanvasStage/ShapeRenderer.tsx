import { RectangleObj, ShapeObj, EllipseObj, ImageObj, PhoneInputObj, EmailInputObj, HeadingObj, ParagraphObj, ShortTextInputObj, LongTextInputObj, DateInputObj, TableInputObj } from "../../../../utils/types/CanvasInterfaces";
import RectangleShape from '../Shapes/SolidShapes/RectangleShape';
import EllipseShape from '../Shapes/SolidShapes/EllipseShape';
import ImageShape from '../Shapes/SolidShapes/ImageShape';
import PhoneInput from '../Shapes/Inputs/PhoneInput';
import EmailInput from '../Shapes/Inputs/EmailInput';
import Heading from '../Shapes/TextFields/Heading';
import Paragraph from '../Shapes/TextFields/Paragraph';
import ShortTextInput from '../Shapes/Inputs/ShortTextInput';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import LongTextInput from '../Shapes/Inputs/LongTextInput';
import DateInput from '../Shapes/Inputs/DateInput';
import TableInput from '../Shapes/Inputs/TableInput/TableInput';


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
                    case 'PhoneInput':
                        const phoneInput = shape as PhoneInputObj;
                        return (
                            <PhoneInput
                                key={phoneInput.id}
                                phoneInputObj={phoneInput}
                            />
                        );
                    case 'EmailInput':
                        const emailInput = shape as EmailInputObj;
                        return (
                            <EmailInput
                                key={emailInput.id}
                                emailInputObj={emailInput}
                            />
                        );
                    case 'ShortTextInput':
                        const shortTextInput = shape as ShortTextInputObj;
                        return (
                            <ShortTextInput
                                key={shortTextInput.id}
                                shortTextInputObj={shortTextInput}
                            />
                        );
                    case 'LongTextInput':
                        const longTextInput = shape as LongTextInputObj;
                        return (
                            <LongTextInput
                                key={longTextInput.id}
                                longTextInputObj={longTextInput}
                            />
                        );
                    case 'DateInput':
                        const dateInput = shape as DateInputObj;
                        return (
                            <DateInput
                                key={dateInput.id}
                                dateInputObj={dateInput}
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
                    default:
                        return null;
                }
            })
            }
        </>
    )
}
export default ShapeRenderer;