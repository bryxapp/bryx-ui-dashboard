import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

interface FontStylePickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ canvasDesign, setCanvasDesign }) => {
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
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === canvasDesign.selectedId) {
                    return {
                        ...shape,
                        fontStyle: fontStyle,
                    };
                }
                return shape;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };
    const selectedTextItemFontStyle = canvasDesign.Shapes.find((shape: ShapeObj): shape is TextInputObj | TextFieldObj => shape.id === canvasDesign.selectedId)?.fontStyle;

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
