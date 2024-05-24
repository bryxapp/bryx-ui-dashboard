import { useEffect, useState } from 'react';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { DatePicker, Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs type from dayjs
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface EstimateFormDateFieldProps {
    dateInputObj: DateInputObj;
    fieldValue: string;
    setFormInputs: React.Dispatch<React.SetStateAction<any>>; // Properly type setFormInputs
    formInputs: any;
    sorting?: boolean;
}

const EstimateFormDateField: React.FC<EstimateFormDateFieldProps> = ({ // Define component as React.FC with props
    dateInputObj,
    setFormInputs,
    formInputs,
    fieldValue,
    sorting
}: EstimateFormDateFieldProps) => {

    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleInputNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, dateInputObj.id);
    };

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
            label={sorting ? (
                <Input
                    value={dateInputObj.name}
                    onChange={handleInputNameValueChange}
                />
            ) : (
                dateInputObj.name
            )}
            style={{ marginBottom: '5px' }}
        >
            <DatePicker
                onChange={(date) => handleDateChange(date ? date.format("MM/DD/YYYY") : '', dateInputObj.id)}
                value={date}
                format="MM/DD/YYYY"
                disabled={sorting}
            />
        </Form.Item>
    );
};

export default EstimateFormDateField;