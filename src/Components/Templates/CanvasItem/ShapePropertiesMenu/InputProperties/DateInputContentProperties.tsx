import { Card } from 'antd';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import DateFormatPicker from './DateFormatSelector';

interface InputContentPropertiesProps {
    dateInputObj: DateInputObj;
}

const DateInputContentProperties = ({ dateInputObj }: InputContentPropertiesProps) => {
    return (
        <Card>
            <DateFormatPicker dateInputObj={dateInputObj} />
            <div style={{ height: '10px' }} />
            <TextProperties textObj={dateInputObj} />
        </Card>
    );
};

export default DateInputContentProperties;
