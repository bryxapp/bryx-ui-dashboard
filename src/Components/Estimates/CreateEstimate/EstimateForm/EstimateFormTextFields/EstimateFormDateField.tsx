import { useEffect, useState } from 'react';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs type from dayjs

interface EstimateFormDateFieldProps {
    dateInputObj: DateInputObj;
    fieldValue: string;
    setFormInputs: React.Dispatch<React.SetStateAction<any>>; // Properly type setFormInputs
    formInputs: any;
    disabled?: boolean;
}

const EstimateFormDateField: React.FC<EstimateFormDateFieldProps> = ({ // Define component as React.FC with props
    dateInputObj,
    setFormInputs,
    formInputs,
    fieldValue,
    disabled
}: EstimateFormDateFieldProps) => {

    const [date, setDate] = useState<Dayjs | null>(null);
    useEffect(() => {
        if (dayjs(fieldValue).isValid()) {
            setDate(dayjs(fieldValue));
        }
    }, [fieldValue]);

    const handleDateChange = (dateString: string, inputObjId: string) => {
        const updatedFormInputs = {
            ...formInputs,
            [inputObjId]: {
                ...formInputs[inputObjId],
                value: dateString,
            },
        };
        setFormInputs(updatedFormInputs);
    };

    return (
        <Form.Item
            key={dateInputObj.id}
            label={dateInputObj.label.value}
            rules={[{ type: 'object', required: true, message: 'Please select date' }]} // Add required rule for Date validation
            style={{ marginBottom: '5px' }}
        >
            <DatePicker
                onChange={(date) => handleDateChange(date ? date.format("MM/DD/YYYY") : '', dateInputObj.id)}
                value={date}
                format="MM/DD/YYYY"
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormDateField;