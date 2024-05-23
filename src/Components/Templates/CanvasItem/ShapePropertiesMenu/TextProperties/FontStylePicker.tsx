import React from 'react';
import { Button } from 'antd';
import { ItalicOutlined, BoldOutlined } from '@ant-design/icons';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { toggleCellTextStyle, toggleTextStyle } from '../../../../../utils/shapeManagementUtils';

interface FontStylePickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ textObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedTextItemFontStyle = textObj.fontStyle;

    const selectedFontStyles = [];
    if (selectedTextItemFontStyle?.includes('italic')) {
        selectedFontStyles.push('italic');
    }
    if (selectedTextItemFontStyle?.includes('bold')) {
        selectedFontStyles.push('bold');
    }

    const handleClick = (property: 'bold' | 'italic' | 'underline' | 'line-through') => {
        if (property === null) return;
        if (textObj.type === 'CellInput' || textObj.type === 'TextCell') {
            toggleCellTextStyle(canvasDesign, setCanvasDesign, selectedId, property)
            return;
        }
        toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, property)
    };

    return (
        <>
            <Button
                type={selectedFontStyles.includes('italic') ? 'primary' : 'default'}
                icon={<ItalicOutlined />}
                onClick={() => handleClick('italic')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={selectedFontStyles.includes('bold') ? 'primary' : 'default'}
                icon={<BoldOutlined />}
                onClick={() => handleClick('bold')}
                size="small"
                disabled={disabled}
            />
        </>
    );
};

export default FontStylePicker;