import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import { CanvasDesignData, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { toggleTextStyle } from '../../../../../utils/functions/CanvasFunctions';
import { findShape } from '../../../../../utils/canvas-util';

interface FontStylePickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ canvasDesign, setCanvasDesign }) => {
    const selectedTextItemFontStyle = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | TextFieldObj)?.fontStyle;

    const selectedFontStyles = [];
    if (selectedTextItemFontStyle?.includes('italic')) {
        selectedFontStyles.push('italic');
    }
    if (selectedTextItemFontStyle?.includes('bold')) {
        selectedFontStyles.push('bold');
    }

    return (
        <ToggleButtonGroup
            value={selectedFontStyles}
            aria-label="font style"
            style={{ marginBottom: '1rem', margin: 10 }}
            size = "small"
        >
            <ToggleButton key={'italic'} value={'italic'}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, 'italic')}>
                <ItalicIcon />
            </ToggleButton>
            <ToggleButton key={'bold'} value={'bold'}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, 'bold')}>
                <BoldIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontStylePicker;
