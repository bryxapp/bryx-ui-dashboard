import React from 'react';
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { CanvasDesignData, ShapeObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape } from '../../../../../utils/canvas-util';


interface InputFormatPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const formats: string[] = ['text', 'number', 'date', 'email', 'phone', 'paragraph', 'currency'];

const InputFormatPicker = ({ canvasDesign, setCanvasDesign }: InputFormatPickerProps) => {

    const isTextInput: boolean = findShape(canvasDesign, canvasDesign.selectedId)?.type === 'TextInput' || false;

    const handleFormatPickerChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === canvasDesign.selectedId) {
                    return {
                        ...shape,
                        format: event.target.value,
                    };
                } else {
                    return shape;
                }
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextInputFormat = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | undefined)?.format ?? '';

    if (!isTextInput) return null;

    return (
        <>
            <Typography variant="body1">
                Format
            </Typography>
            <Select
                value={selectedTextInputFormat}
                onChange={handleFormatPickerChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '7rem', margin: 10 }}
                size='small'
            >
                {formats.map((format) => (
                    <MenuItem key={format} value={format}>
                        {format}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default InputFormatPicker;
