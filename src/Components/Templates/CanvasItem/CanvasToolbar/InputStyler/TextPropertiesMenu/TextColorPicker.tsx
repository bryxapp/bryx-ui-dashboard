import * as React from 'react';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input'

interface ColorPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function TextColorPicker({ textObj, itemType, canvasDesign, setCanvasDesign }: ColorPickerProps) {
    const onColorChange = (newColorValue: string) => {
        updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fill', newColorValue, canvasDesign.selectedId);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1">
                Font Color
            </Typography>
            <MuiColorInput format="hex" value={textObj.fill} onChange={onColorChange} sx={{width:'8em'}} />
        </div>

    );
}
