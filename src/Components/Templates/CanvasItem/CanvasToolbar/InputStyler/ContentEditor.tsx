import React from 'react';
import { StyledTextField as TextField } from '../../../../SharedComponents/TextField/TextField';
import Typography from "@mui/material/Typography";
import { CanvasDesignData, InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { getInputShape, updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import { FormControl, FormLabel, FormGroup, Stack } from '@mui/material';
import TextPropertiesMenu from './TextPropertiesMenu/TextPropertiesMenu';

interface ContentEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const ContentEditor = ({ canvasDesign, setCanvasDesign }: ContentEditorProps) => {

    const handleLabelValueChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, canvasDesign.selectedId);
    };

    const inputShape = getInputShape(canvasDesign, canvasDesign.selectedId) as InputObj | undefined;
    if (!inputShape) return null;
    const selectedInputContent = (getInputShape(canvasDesign, canvasDesign.selectedId) as InputObj | undefined)?.content.value ?? '';

    return (
        <FormControl
            component="fieldset"
            variant="standard"
            sx={{
                paddingLeft: '1rem'
            }}>
            <FormLabel component="legend" sx={{ color: 'primary.main' }}>Input Content</FormLabel>
            <FormGroup>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body1">
                        Place Holder
                    </Typography>
                    <TextField
                        id={'contentValueEditor'}
                        value={selectedInputContent}
                        onChange={handleLabelValueChange}
                        variant="outlined"
                        size='small'
                    />
                    <TextPropertiesMenu textObj={inputShape.content} itemType={'content'} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </Stack>
            </FormGroup>
        </FormControl>
    );
};

export default ContentEditor;
