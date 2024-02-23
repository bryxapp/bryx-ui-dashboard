import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import { CanvasDesignData, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { toggleTextStyle } from '../../../../../utils/functions/CanvasFunctions';
import { findShape } from '../../../../../utils/canvas-util';

interface FontDecorationPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontDecorationPicker: React.FC<FontDecorationPickerProps> = ({ canvasDesign, setCanvasDesign }) => {
    const selectedTextItemFontDecoration = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | TextFieldObj)?.textDecoration;

    const selectedFontDecorations = [];
    if (selectedTextItemFontDecoration?.includes('underline')) {
        selectedFontDecorations.push('underline');
    }
    if (selectedTextItemFontDecoration?.includes('line-through')) {
        selectedFontDecorations.push('line-through');
    }

    return (
        <ToggleButtonGroup
            value={selectedFontDecorations}
            aria-label="font decoration"
            style={{ marginBottom: '1rem', margin: 10 }}
            size='small'
        >
            <ToggleButton
                key={'line-through'}
                value={'line-through'}
                onClick={() => { toggleTextStyle(canvasDesign, setCanvasDesign, 'line-through') }}
            >
                <StrikethroughIcon />
            </ToggleButton>
            <ToggleButton key={'underline'} value={'underline'}
                onClick={() => { toggleTextStyle(canvasDesign, setCanvasDesign, 'underline') }}
            >
                <UnderlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontDecorationPicker;
