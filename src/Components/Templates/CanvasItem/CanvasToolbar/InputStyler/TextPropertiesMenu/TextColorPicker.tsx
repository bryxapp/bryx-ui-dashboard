import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input'

interface ColorPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null
}

export default function TextColorPicker({ textObj, itemType }: ColorPickerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const onColorChange = (newColorValue: string) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fill', newColorValue, selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fill', newColorValue, selectedId);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1">
                Font Color
            </Typography>
            <MuiColorInput format="hex" value={textObj.fill} onChange={onColorChange} sx={{ width: '8em' }} />
        </div>

    );
}
