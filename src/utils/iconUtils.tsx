import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdShortText } from "react-icons/md";
import { MdNotes } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { FaHeading } from "react-icons/fa6";
import { BsTextParagraph } from "react-icons/bs";
import { ShapeType } from "./types/CanvasInterfaces";
import { MdOutlineRectangle as AddRectangleIcon, MdOutlineCrop75 as AddRoundedRectangleIcon, MdOutlineCircle as AddEllipseIcon } from 'react-icons/md';
import { MdImageSearch } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import { ReactElement } from "react";

export const mapTypeToTitle = (type: ShapeType) => {
    switch (type) {
        case 'ShortTextInput':
            return 'Short Text Input'
        case 'LongTextInput':
            return 'Long Text Input'
        case 'EmailInput':
            return 'Email Input'
        case 'PhoneInput':
            return 'Phone Input'
        case 'DateInput':
            return 'Date Input'
        case 'TableInput':
            return 'Table Input'
        case 'Heading':
            return 'Heading'
        case 'Paragraph':
            return 'Paragraph'
        case 'Rectangle':
            return 'Rectangle'
        case 'RoundedRectangle':
            return 'Rounded Rectangle'
        case 'Ellipse':
            return 'Ellipse'
        case 'UserImage':
            return 'User Image'
        case 'StockImage':
            return 'Stock Image'
        default:
            return type;
    }
}

export const mapTypeToIcon = (type: ShapeType):ReactElement => {
    switch (type) {
        case 'ShortTextInput':
            return <MdShortText />
        case 'LongTextInput':
            return <MdNotes />
        case 'EmailInput':
            return <MdOutlineEmail />
        case 'PhoneInput':
            return <MdLocalPhone />
        case 'DateInput':
            return <MdCalendarMonth />
        case 'Heading':
            return <FaHeading />
        case 'Paragraph':
            return <BsTextParagraph />
        case 'Rectangle':
            return <AddRectangleIcon />
        case 'RoundedRectangle':
            return <AddRoundedRectangleIcon />
        case 'Ellipse':
            return <AddEllipseIcon />
        case 'UserImage':
            return <MdImageSearch />
        case 'StockImage':
            return <FaRegImages />
        case 'TableInput':
        default:
            return <></>;
    }
}