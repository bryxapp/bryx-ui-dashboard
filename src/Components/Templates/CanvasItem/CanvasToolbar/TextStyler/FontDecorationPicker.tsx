import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import { TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

interface FontDecorationPickerProps {
    canvasDesign: any;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

const FontDecorationPicker: React.FC<FontDecorationPickerProps> = ({ canvasDesign, setCanvasDesign, selectedId }) => {
    const handleFontDecorationChange = (event: React.MouseEvent<HTMLElement>, newFontDecoration: string[]) => {
        const fontDecoration = newFontDecoration.includes('line-through') && newFontDecoration.includes('underline')
            ? 'underline line-through'
            : newFontDecoration.includes('line-through')
                ? 'line-through'
                : newFontDecoration.includes('underline')
                    ? 'underline'
                    : '';

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((textItem: TextFieldObj | TextInputObj) => {
                if (textItem.id === selectedId) {
                    return {
                        ...textItem,
                        textDecoration: fontDecoration,
                    };
                }
                return textItem;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontDecoration = canvasDesign.Shapes.find((textItem: TextFieldObj | TextInputObj) => textItem.id === selectedId)?.textDecoration;

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
            onChange={handleFontDecorationChange}
            aria-label="font decoration"
            style={{ marginBottom: '1rem', margin: 10 }}
        >
            <ToggleButton key={'line-through'} value={'line-through'}>
                <StrikethroughIcon />
            </ToggleButton>
            <ToggleButton key={'underline'} value={'underline'}>
                <UnderlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontDecorationPicker;
