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
import { ReactElement } from "react";
import { TableOutlined } from "@ant-design/icons";

export const mapTypeToTitle = (type: ShapeType) => {
    switch (type) {
        case 'ShortTextInput':
            return 'Single Line'
        case 'LongTextInput':
            return 'Multi Line'
        case 'EmailInput':
            return 'Email'
        case 'PhoneInput':
            return 'Phone'
        case 'DateInput':
            return 'Date'
        case 'TableInput':
            return 'Table'
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
        case 'TableInput':
            return <TableOutlined />
        default:
            return <></>;
    }
}