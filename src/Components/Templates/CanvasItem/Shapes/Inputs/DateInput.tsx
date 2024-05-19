import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { format } from 'date-fns';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface DateInputProps {
    dateInputObj: DateInputObj;
    draggable?: boolean;
}

const DateInput = ({ dateInputObj, draggable = true }: DateInputProps) => {
    const formattedDate = format(new Date(), dateInputObj.dateFormat);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(dateInputObj, formattedDate);
    dateInputObj.value = formattedDate;
    return (
        <InputContent
            inputObj={dateInputObj}
            containerWidth={contentShapeWidth}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            containerHeight={contentShapeHeight}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default DateInput;