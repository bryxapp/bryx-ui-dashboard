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
    const containerHeight = contentShapeHeight;
    const containerWidth = contentShapeWidth;
    dateInputObj.value = formattedDate;
    return (
        <InputContent
            inputObj={dateInputObj}
            containerWidth={containerWidth}
            inputHeight={contentShapeHeight}
            inputWidth={dateInputObj.width}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            containerHeight={containerHeight}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default DateInput;