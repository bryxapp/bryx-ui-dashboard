import { useEffect, useState } from 'react';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs'; // Ensure you are importing Dayjs type if needed

interface EstimateFormDateFieldProps {
    dateInputObj: DateInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
}

const EstimateFormDateField = ({
    dateInputObj,
    fieldValue,
    handleChange
}: EstimateFormDateFieldProps) => {
    const [date, setDate] = useState<Dayjs | null>(null); // Ensure this is properly typed as Dayjs | null
    useEffect(() => {
        //If is parseable date 
        if (dayjs(fieldValue).isValid()) {
            setDate(dayjs(fieldValue)); // Ensure this is properly typed as Dayjs | null
        }
    }, [fieldValue]);

    return (
        <Form.Item
            key={dateInputObj.id}
            label={dateInputObj.label.value}
            rules={[{ type: 'object', message: 'Please select date' }]} // Corrected rules for Date validation
            style={{ marginBottom: '5px' }}
        >
            <DatePicker
                onChange={(date) => handleChange(date.toString(), dateInputObj.id)} // Pass the date and id to the handleChange function
                value={date} // Set value instead of defaultValue to control component
                format="YYYY-MM-DD" // Specify the display format
            />
        </Form.Item>
    );
};

export default EstimateFormDateField;
