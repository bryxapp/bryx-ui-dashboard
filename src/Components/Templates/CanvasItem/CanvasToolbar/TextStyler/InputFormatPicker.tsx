import React from 'react';
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { CanvasDesignData, ShapeObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';


interface InputFormatPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

const formats: string[] = ['text', 'number', 'date', 'email', 'phone', 'paragraph', 'currency'];

const InputFormatPicker = ({ canvasDesign, setCanvasDesign, selectedId }: InputFormatPickerProps) => {

    const isTextInput: boolean = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === selectedId)?.type?.includes('TextInput') || false;

    const handleFormatPickerChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
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

    const selectedTextInputFormat = (canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === selectedId) as TextInputObj | undefined)?.format ?? '';

    if (!isTextInput) return null;

    return (
        <>
            <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                Format
            </Typography>
            <Select
                value={selectedTextInputFormat}
                onChange={handleFormatPickerChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
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
