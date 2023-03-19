import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
interface CanvasDesign {
    TextInputs: Array<{
        id: string;
        fontStyle: string;
    }>;
    TextFields: Array<{
        id: string;
        fontStyle: string;
    }>;
}

interface FontStylePickerProps {
    canvasDesign: CanvasDesign;
    setCanvasDesign: (newCanvasDesign: CanvasDesign) => void;
    selectedId: string | null;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ canvasDesign, setCanvasDesign, selectedId }) => {
    const handleFontStyleChange = (event: React.MouseEvent<HTMLElement>, newFontStyle: string[]) => {
        const fontStyle = newFontStyle.includes('italic') && newFontStyle.includes('bold')
            ? 'bold italic'
            : newFontStyle.includes('italic')
                ? 'italic'
                : newFontStyle.includes('bold')
                    ? 'bold'
                    : 'normal';

        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontStyle: fontStyle,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontStyle: fontStyle,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontStyle =
        canvasDesign.TextInputs.find((textInput) => textInput.id === selectedId)?.fontStyle ||
        canvasDesign.TextFields.find((textField) => textField.id === selectedId)?.fontStyle;

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
            onChange={handleFontStyleChange}
            aria-label="font style"
            style={{ marginBottom: '1rem', margin: 10 }}
        >
            <ToggleButton key={'italic'} value={'italic'}>
                <ItalicIcon />
            </ToggleButton>
            <ToggleButton key={'bold'} value={'bold'}>
                <BoldIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontStylePicker;
