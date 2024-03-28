import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    textObj: TextBase
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ textObj, itemType, canvasDesign, setCanvasDesign }) => {

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment) {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'align', newAlignment, canvasDesign.selectedId);
        }
    };

    return (
        <ToggleButtonGroup
            value={textObj.align}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="text alignment"
            style={{ marginBottom: '1rem', margin: 10 }}
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
