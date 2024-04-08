import { Button } from 'antd';
import { UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
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
        <>
            <Button
                type={selectedFontDecorations.includes('line-through') ? 'primary' : 'default'}
                icon={<StrikethroughOutlined />}
                onClick={() => toggleTextStyle('line-through')}
                size="small"
            />
            <Button
                type={selectedFontDecorations.includes('underline') ? 'primary' : 'default'}
                icon={<UnderlineOutlined />}
                onClick={() => toggleTextStyle('underline')}
                size="small"
            />
        </>
    );
};

export default FontDecorationPicker;