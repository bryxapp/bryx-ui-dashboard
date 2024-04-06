import React from 'react';
import { InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
// import { getInputProps } from '../../../../../utils/form-utils';
import { Input, Typography } from 'antd';

interface EstimateFormTextFieldProps {
    inputObj: InputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextField = ({
    inputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [inputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    };

   // const inputProps = getInputProps(inputObj.type);

    return (
        <>
        <Typography.Text>
            {inputObj.label.value}
        </Typography.Text>
            
        <Input
            key={inputObj.id}
            value={fieldValues[inputObj.id]}
            onChange={handleChange}
        />
        </>
    );
};

export default EstimateFormTextField;
