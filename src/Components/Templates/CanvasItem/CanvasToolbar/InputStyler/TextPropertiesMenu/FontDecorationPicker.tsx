import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import { InputObj, ShapeObj, TextBase, TextObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface FontDecorationPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}

const FontDecorationPicker: React.FC<FontDecorationPickerProps> = ({ textObj, itemType }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedTextItemFontDecoration = textObj.textDecoration;

    const selectedFontDecorations = [];
    if (selectedTextItemFontDecoration?.includes('underline')) {
        selectedFontDecorations.push('underline');
    }
    if (selectedTextItemFontDecoration?.includes('line-through')) {
        selectedFontDecorations.push('line-through');
    }

    const toggleTextStyle = (
        style: 'bold' | 'italic' | 'underline' | 'line-through'
    ) => {
        const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

        const updatedShapes = canvasDesign.Shapes.map((shape:ShapeObj) => {
            if (shape.id === selectedId) {
                if (itemType === null) {
                    const textObj = shape as TextObj;
                    const currentStyle = textObj[styleProperty] || '';
                    const isStyleApplied = currentStyle.includes(style);
                    textObj[styleProperty] = isStyleApplied
                        ? currentStyle.replace(style, '').trim()
                        : `${currentStyle} ${style}`.trim();
                    return { ...shape, [styleProperty]: textObj[styleProperty] };
                }
                else {
                    const inputObj = shape as InputObj;
                    const currentStyle = inputObj[itemType][styleProperty] || '';
                    const isStyleApplied = currentStyle.includes(style);
                    inputObj[itemType][styleProperty] = isStyleApplied
                        ? currentStyle.replace(style, '').trim()
                        : `${currentStyle} ${style}`.trim();

                    return { ...inputObj, [styleProperty]: inputObj[itemType][styleProperty] };
                }
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
            value={selectedFontDecorations}
            aria-label="font decoration"
            size="small"
        >
            <ToggleButton
                key={'line-through'}
                value={'line-through'}
                onClick={() => { toggleTextStyle('line-through') }}
            >
                <StrikethroughIcon />
            </ToggleButton>
            <ToggleButton key={'underline'} value={'underline'}
                onClick={() => { toggleTextStyle('underline') }}
            >
                <UnderlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FontDecorationPicker;
