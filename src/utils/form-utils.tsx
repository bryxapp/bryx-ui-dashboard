import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ParagraphIcon from '@mui/icons-material/ViewHeadline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextIcon from '@mui/icons-material/TextFields';
import NumberIcon from '@mui/icons-material/Numbers';

export const getInputProps = (inputType: string) => {
    switch (inputType) {
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
