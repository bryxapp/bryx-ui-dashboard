import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import { CanvasDesignData, InputObj, TextBase } from '../../../../../../utils/types/CanvasInterfaces';

interface FontStylePickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ textObj, itemType, canvasDesign, setCanvasDesign }) => {
    const selectedTextItemFontStyle = textObj.fontStyle;
    if (!selectedTextItemFontStyle) return null;

    const selectedFontStyles = [];
    if (selectedTextItemFontStyle?.includes('italic')) {
        selectedFontStyles.push('italic');
    }
    if (selectedTextItemFontStyle?.includes('bold')) {
        selectedFontStyles.push('bold');
    }

    const toggleTextStyle = (
        style: 'bold' | 'italic' | 'underline' | 'line-through'
    ) => {
        const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

        const updatedShapes = canvasDesign.Shapes.map((shape) => {
            if (shape.id === canvasDesign.selectedId) {
                const inputObj = shape as InputObj;
                const currentStyle = inputObj[itemType][styleProperty] || '';
                const isStyleApplied = currentStyle.includes(style);
                inputObj[itemType][styleProperty] = isStyleApplied
                    ? currentStyle.replace(style, '').trim()
                    : `${currentStyle} ${style}`.trim();

                return { ...inputObj, [styleProperty]: inputObj[itemType][styleProperty] };
            }
            return shape;
        });
        setCanvasDesign({
            ...canvasDesign,
            Shapes: updatedShapes,
        });
    };

    return (
        <ToggleButtonGroup
            value={selectedFontStyles}
            aria-label="font style"
            style={{ marginBottom: '1rem', }}
            size="small"
        >
            <ToggleButton key={'italic'} value={'italic'}
                onClick={() => toggleTextStyle('italic')}>
                <ItalicIcon />
            </ToggleButton>
            <ToggleButton key={'bold'} value={'bold'}
                onClick={() => toggleTextStyle('bold')}>
                <BoldIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontStylePicker;
