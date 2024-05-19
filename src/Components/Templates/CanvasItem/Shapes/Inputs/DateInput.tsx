import { format } from 'date-fns';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface DateInputProps {
    dateInputObj: DateInputObj;
    draggable?: boolean;
}

const DateInput = ({ dateInputObj, draggable = true }: DateInputProps) => {
    dateInputObj.value = format(new Date(), dateInputObj.dateFormat);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(dateInputObj);
    dateInputObj.width = contentShapeWidth;
    dateInputObj.height = contentShapeHeight;
    
    return (
        <InputContent
            inputObj={dateInputObj}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default DateInput;