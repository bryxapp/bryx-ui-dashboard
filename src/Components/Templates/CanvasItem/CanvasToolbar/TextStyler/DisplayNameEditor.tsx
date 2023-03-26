import React from 'react';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CanvasDesignData, ShapeObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';


interface DisplayNameEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

const FontStylePicker: React.FC<DisplayNameEditorProps> = ({ canvasDesign, setCanvasDesign, selectedId }) => {

    const isTextInput: boolean = canvasDesign.Shapes.find((shape:ShapeObj) => shape.id === selectedId)?.type?.includes('TextInput') || false;

    const handleDisplayNameChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
                    return {
                        ...shape,
                        displayName: event.target.value,
                    };
                } else {
                    return shape;
                }
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextInputDisplayName = (canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === selectedId) as TextInputObj | undefined)?.displayName ?? '';

    if (!isTextInput) return null;

    return (
        <>
            <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }} >
                Input Name
            </Typography>
            <TextField
                id={'displayNameEditor'}
                value={selectedTextInputDisplayName}
                onChange={(event) => handleDisplayNameChange(event)}
                variant="outlined"
                style={{ marginBottom: '1rem', margin: 10 }}
            />
        </>
    );
};

export default FontStylePicker;