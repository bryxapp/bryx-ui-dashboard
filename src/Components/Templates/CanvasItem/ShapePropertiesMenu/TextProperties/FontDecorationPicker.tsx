import { Button } from 'antd';
import { UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { toggleCellTextStyle, toggleTextStyle } from '../../../../../utils/shapeManagementUtils';

interface FontDecorationPickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

const FontDecorationPicker: React.FC<FontDecorationPickerProps> = ({ textObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedTextItemFontDecoration = textObj.textDecoration;

    const selectedFontDecorations = [];
    if (selectedTextItemFontDecoration?.includes('underline')) {
        selectedFontDecorations.push('underline');
    }
    if (selectedTextItemFontDecoration?.includes('line-through')) {
        selectedFontDecorations.push('line-through');
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
                type={selectedFontDecorations.includes('line-through') ? 'primary' : 'default'}
                icon={<StrikethroughOutlined />}
                onClick={() => handleClick('line-through')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={selectedFontDecorations.includes('underline') ? 'primary' : 'default'}
                icon={<UnderlineOutlined />}
                onClick={() => handleClick('underline')}
                size="small"
                disabled={disabled}
            />
        </>
    );
};

export default FontDecorationPicker;