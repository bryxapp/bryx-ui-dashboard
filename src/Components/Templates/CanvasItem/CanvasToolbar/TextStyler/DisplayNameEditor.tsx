import React from 'react';
import {StyledTextField as TextField} from '../../../../SharedComponents/TextField/TextField'
import Typography from "@mui/material/Typography";
import { CanvasDesignData, ShapeObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape } from '../../../../../utils/canvas-util';


interface DisplayNameEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontStylePicker: React.FC<DisplayNameEditorProps> = ({ canvasDesign, setCanvasDesign }) => {

    const isTextInput: boolean = findShape(canvasDesign, canvasDesign.selectedId)?.type?.includes('TextInput') || false;

    const handleDisplayNameChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === canvasDesign.selectedId) {
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

    const selectedTextInputDisplayName = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | undefined)?.displayName ?? '';

    if (!isTextInput) return null;

    return (
        <>
            <Typography variant="body1" >
                Input Name
            </Typography>
            <TextField
                id={'displayNameEditor'}
                value={selectedTextInputDisplayName}
                onChange={(event) => handleDisplayNameChange(event)}
                variant="outlined"
                style={{ marginBottom: '1rem', margin: 10, minWidth: '7rem' }}
                size='small'
            />
        </>
    );
};

export default FontStylePicker;
