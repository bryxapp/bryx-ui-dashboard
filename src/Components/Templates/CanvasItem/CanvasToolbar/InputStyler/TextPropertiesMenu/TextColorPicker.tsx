import * as React from 'react';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input'

interface ColorPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function TextColorPicker({ textObj, itemType, canvasDesign, setCanvasDesign }: ColorPickerProps) {
    const onColorChange = (newColorValue: string) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fill', newColorValue, canvasDesign.selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fill', newColorValue, canvasDesign.selectedId);
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
