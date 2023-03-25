import React from 'react';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { textInputObj } from '../../../../../utils/types/ShapeInterfaces';
import { TemplateCreationState } from '../../../../../utils/types/TemplateCreationInterfaces';


interface DisplayNameEditorProps {
    canvasDesign: TemplateCreationState;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

const FontStylePicker: React.FC<DisplayNameEditorProps> = ({ canvasDesign, setCanvasDesign, selectedId }) => {

    const isTextInput: boolean = canvasDesign.TextInputs.find((textInput) => textInput.id === selectedId) !== undefined;

    const handleDisplayNameChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: textInputObj) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        displayName: event.target.value,
                    };
                } else {
                    return textInput;
                }
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextInputDisplayName = canvasDesign.TextInputs.find((textInput) => textInput.id === selectedId)?.displayName;

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
