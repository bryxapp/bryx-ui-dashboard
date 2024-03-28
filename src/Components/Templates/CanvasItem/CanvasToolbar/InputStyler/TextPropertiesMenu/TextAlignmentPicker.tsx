import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    textObj: TextBase
    itemType: 'content' | 'label' | null;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ textObj, itemType, canvasDesign, setCanvasDesign }) => {
    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment) {
            if (itemType === null)
                updateShapeProperty(canvasDesign, setCanvasDesign, 'align', newAlignment, canvasDesign.selectedId);
            else {
                updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'align', newAlignment, canvasDesign.selectedId);
            }
        }
    };
    return (
        <ToggleButtonGroup
            value={textObj.align}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="text alignment"
            size="small"
        >
            <ToggleButton key={'left'} value={'left'}>
                <AlignLeftIcon />
            </ToggleButton>
            <ToggleButton key={'center'} value={'center'}>
                <AlignCenterIcon />
            </ToggleButton>
            <ToggleButton key={'right'} value={'right'}>
                <AlignRightIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TextAlignmentPicker;
