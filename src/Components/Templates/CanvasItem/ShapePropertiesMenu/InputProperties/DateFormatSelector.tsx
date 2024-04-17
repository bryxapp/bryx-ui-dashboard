import { Select, Typography } from 'antd';
import { DateFormatOptions, DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { format } from 'date-fns';

const { Option } = Select;

interface DateFormatPickerProps {
    dateInputObj: DateInputObj;
    disabled?: boolean;
}

export default function DateFormatPicker({ dateInputObj, disabled }: DateFormatPickerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleDateFormatChange = (value: string) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'dateFormat', value, selectedId);
    };

    const selectedDateFormatOption = dateInputObj.dateFormat;
    if (!selectedDateFormatOption) return null;

    const today = new Date();

    const getFormattedDate = (date: Date, formatOption: string) => {
        return format(date, formatOption);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text>Date Format</Typography.Text>
            <Select
                value={getFormattedDate(today, selectedDateFormatOption)}
                onChange={handleDateFormatChange}
                size='small'
                popupMatchSelectWidth={false}
                dropdownStyle={{ maxHeight: 250 }}
                disabled={disabled}
            >
                {DateFormatOptions.map((dateFormat) => (
                    <Option key={dateFormat} value={dateFormat}>
                        {getFormattedDate(today, dateFormat)}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
