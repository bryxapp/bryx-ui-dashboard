import React from 'react';
import { StyledTextField as TextField } from '../../../../SharedComponents/TextField/TextField'
import Typography from "@mui/material/Typography";
import { CanvasDesignData, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';


interface DisplayNameEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontStylePicker: React.FC<DisplayNameEditorProps> = ({ canvasDesign, setCanvasDesign }) => {

    const isTextInput: boolean = findShape(canvasDesign, canvasDesign.selectedId)?.type?.includes('TextInput') || false;

    const handleDisplayNameChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'displayName', event.target.value, canvasDesign.selectedId)
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
