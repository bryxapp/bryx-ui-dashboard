import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ParagraphIcon from '@mui/icons-material/ViewHeadline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextIcon from '@mui/icons-material/TextFields';
import NumberIcon from '@mui/icons-material/Numbers';
import { TextInputFormat } from './types/CanvasInterfaces';

export const getInputProps = (format: TextInputFormat) => {
    switch (format) {
        case 'number':
            return { type: 'number', startAdornment: <NumberIcon /> };
        case 'date':
            return { type: 'date', startAdornment: <DateRangeIcon /> };
        case 'email':
            return { type: 'email', startAdornment: <MailOutlineIcon /> };
        case 'phone':
            return { type: 'tel', startAdornment: <PhoneIcon /> };
        case 'paragraph':
            return { type: 'text', multiline: true, rows: 4, startAdornment: <ParagraphIcon /> };
        case 'currency':
            return { type: 'text', startAdornment: <AttachMoneyIcon /> };
        default:
            return { type: 'text', startAdornment: <TextIcon /> };
    }
};

export const formatDate = (value: string) => {
    const date = new Date(value);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
}
