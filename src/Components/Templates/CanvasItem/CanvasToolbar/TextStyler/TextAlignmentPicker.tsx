import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { CanvasDesignData, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment) {
            updateShapeProperty(canvasDesign, setCanvasDesign, 'align', newAlignment, canvasDesign.selectedId)
        }
    };

    const selectedTextAlignment = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | TextFieldObj)?.align
    if (!selectedTextAlignment) return null;

    return (
        <ToggleButtonGroup
            value={selectedTextAlignment}
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
