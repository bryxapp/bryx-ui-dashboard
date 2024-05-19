import { format } from 'date-fns';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface DateInputProps {
    dateInputObj: DateInputObj;
}

const DateInput = ({ dateInputObj }: DateInputProps) => {
    dateInputObj.value = format(new Date(), dateInputObj.dateFormat);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(dateInputObj);
    dateInputObj.width = contentShapeWidth;
    dateInputObj.height = contentShapeHeight;
    
    return (
        <InputContent
            inputObj={dateInputObj}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default DateInput;