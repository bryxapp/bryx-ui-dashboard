import React, { useEffect, useState } from 'react';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs'; // Ensure you are importing Dayjs type if needed

interface EstimateFormDateFieldProps {
    dateInputObj: DateInputObj; // Changed to camelCase
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormDateField = ({
    dateInputObj, // Changed to camelCase
    fieldValues,
    setFieldValues,
}: EstimateFormDateFieldProps) => {
    const [date, setDate] = useState<Dayjs | null>(null); // Ensure this is properly typed as Dayjs | null
    useEffect(() => {
        //If is parseable date 
        if (dayjs(fieldValues[dateInputObj.id]).isValid()) {
            setDate(dayjs(fieldValues[dateInputObj.id])); // Ensure this is properly typed as Dayjs | null
        }
    }
    , [dateInputObj.id, fieldValues]); // Ensure this is properly typed as Dayjs | null

    const handleChange = (value: Dayjs | null) => { // Corrected to handle Dayjs or null from DatePicker
        if (value) {
            const formattedDate = value.format('YYYY-MM-DD'); // Format the date as a string
            const updatedFieldValues = {
                ...fieldValues,
                [dateInputObj.id]: formattedDate, // Store formatted date string
            };
            setFieldValues(updatedFieldValues);
        }
    };

    return (
        <Form.Item
            key={dateInputObj.id}
            label={dateInputObj.label.value}
            rules={[{ type: 'object', message: 'Please select date' }]} // Corrected rules for Date validation
            style={{ marginBottom: '5px' }}
       >
            <DatePicker 
                onChange={handleChange}
                value={date} // Set value instead of defaultValue to control component
                format="YYYY-MM-DD" // Specify the display format
            />
        </Form.Item>
    );
};

export default EstimateFormDateField;
