import React from 'react';
import { Button } from 'antd';
import { ItalicOutlined, BoldOutlined } from '@ant-design/icons';
import { InputObj, TextBase, TextObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface FontStylePickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}

const FontStylePicker: React.FC<FontStylePickerProps> = ({ textObj, itemType }) => {
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

    const toggleTextStyle = (
        style: 'bold' | 'italic' | 'underline' | 'line-through'
    ) => {
        const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

        const updatedShapes = canvasDesign.Shapes.map((shape) => {
            if (shape.id === selectedId) {
                if (itemType === null) {
                    const textObj = shape as TextObj;
                    const currentStyle = textObj[styleProperty] || '';
                    const isStyleApplied = currentStyle.includes(style);
                    textObj[styleProperty] = isStyleApplied
                        ? currentStyle.replace(style, '').trim()
                        : `${currentStyle} ${style}`.trim();
                }
                else {
                    const inputObj = shape as InputObj;
                    const currentStyle = inputObj[itemType][styleProperty] || '';
                    const isStyleApplied = currentStyle.includes(style);
                    inputObj[itemType][styleProperty] = isStyleApplied
                        ? currentStyle.replace(style, '').trim()
                        : `${currentStyle} ${style}`.trim();
                    return { ...shape, [styleProperty]: inputObj[itemType][styleProperty] };
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
        <>
            <Button
                type={selectedFontStyles.includes('italic') ? 'primary' : 'default'}
                icon={<ItalicOutlined />}
                onClick={() => toggleTextStyle('italic')}
                size="small"
            />
            <Button
                type={selectedFontStyles.includes('bold') ? 'primary' : 'default'}
                icon={<BoldOutlined />}
                onClick={() => toggleTextStyle('bold')}
                size="small"
            />
        </>
    );
};

export default FontStylePicker;