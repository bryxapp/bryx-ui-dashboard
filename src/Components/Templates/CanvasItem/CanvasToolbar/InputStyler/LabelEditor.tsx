import React from 'react';
import { StyledTextField as TextField } from '../../../../SharedComponents/TextField/TextField';
import Typography from "@mui/material/Typography";
import { CanvasDesignData, InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { getInputShape, updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { Checkbox, FormControl, FormLabel, FormGroup, Stack, FormControlLabel } from '@mui/material';
import TextPropertiesMenu from './TextPropertiesMenu/TextPropertiesMenu';

interface LabelEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const LabelEditor = ({ canvasDesign, setCanvasDesign }: LabelEditorProps) => {

    const handleLabelValueChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'label', 'value', event.target.value, canvasDesign.selectedId);
    };

    const handleHasLabelChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'hasLabel', event.target.checked, canvasDesign.selectedId);
    };
    const inputShape = getInputShape(canvasDesign, canvasDesign.selectedId) as InputObj | undefined;
    if (!inputShape) return null;
    const selectedInputLabel = inputShape?.label.value ?? '';
    const hasLabel = inputShape?.hasLabel ?? false;

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ color: 'primary.main' }}>Input Label</FormLabel>
            <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1">
                        Value
                    </Typography>
                    <TextField
                        id={'labelValueEditor'}
                        value={selectedInputLabel}
                        onChange={handleLabelValueChange}
                        variant="outlined"
                        size='small'
                        disabled={!hasLabel}
                    />
                    <FormControlLabel control={
                        <Checkbox
                            checked={hasLabel}
                            onChange={handleHasLabelChange}
                            name="hasLabel"
                            sx={{
                                color: 'primary.main', // Color when unchecked
                                '&.Mui-checked': {
                                    color: 'primary.main', // Color when checked
                                },
                            }}
                        />
                    } label="Has Label" />
                    <TextPropertiesMenu textObj={inputShape.label} itemType={'label'} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </Stack>
            </FormGroup>
        </FormControl>
    );
};

export default LabelEditor;
