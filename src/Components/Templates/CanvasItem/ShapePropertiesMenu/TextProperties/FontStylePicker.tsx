import React from 'react';
import { Button } from 'antd';
import { ItalicOutlined, BoldOutlined } from '@ant-design/icons';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { toggleTextStyle } from '../../../../../utils/shapeManagementUtils';

interface FontStylePickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ textObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedTextItemFontStyle = textObj.fontStyle;
    if (!selectedTextItemFontStyle) return null;

    const selectedFontStyles = [];
    if (selectedTextItemFontStyle?.includes('italic')) {
        selectedFontStyles.push('italic');
    }
    if (selectedTextItemFontStyle?.includes('bold')) {
        selectedFontStyles.push('bold');
    }

    return (
        <>
            <Button
                type={selectedFontStyles.includes('italic') ? 'primary' : 'default'}
                icon={<ItalicOutlined />}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, 'italic')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={selectedFontStyles.includes('bold') ? 'primary' : 'default'}
                icon={<BoldOutlined />}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, 'bold')}
                size="small"
                disabled={disabled}
            />
        </>
    );
};

export default FontStylePicker;