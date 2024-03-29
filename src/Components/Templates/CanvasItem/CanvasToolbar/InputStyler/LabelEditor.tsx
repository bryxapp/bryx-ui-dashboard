import { StyledTextField as TextField } from '../../../../SharedComponents/TextField/TextField';
import Typography from "@mui/material/Typography";
import { InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { Checkbox, FormControl, FormLabel, FormGroup, Stack, FormControlLabel } from '@mui/material';
import TextPropertiesMenu from './TextPropertiesMenu/TextPropertiesMenu';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface LabelEditorProps {
    inputObj: InputObj;
}

const LabelEditor = ({ inputObj }: LabelEditorProps) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleLabelValueChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'label', 'value', event.target.value, selectedId);
    };

    const handleHasLabelChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'hasLabel', event.target.checked, selectedId);
    };
    const selectedInputLabel = inputObj.label.value ?? '';
    const hasLabel = inputObj?.hasLabel ?? false;

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
                    <TextPropertiesMenu textObj={inputObj.label} itemType={'label'} />
                </Stack>
            </FormGroup>
        </FormControl>
    );
};

export default LabelEditor;
