import { Button } from 'antd';
import { UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { toggleTextStyle } from '../../../../../utils/shapeManagementUtils';

interface FontDecorationPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    disabled?: boolean;
}

const FontDecorationPicker: React.FC<FontDecorationPickerProps> = ({ textObj, itemType, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedTextItemFontDecoration = textObj.textDecoration;

    const selectedFontDecorations = [];
    if (selectedTextItemFontDecoration?.includes('underline')) {
        selectedFontDecorations.push('underline');
    }
    if (selectedTextItemFontDecoration?.includes('line-through')) {
        selectedFontDecorations.push('line-through');
    }
    
    return (
        <>
            <Button
                type={selectedFontDecorations.includes('line-through') ? 'primary' : 'default'}
                icon={<StrikethroughOutlined />}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, itemType, 'line-through')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={selectedFontDecorations.includes('underline') ? 'primary' : 'default'}
                icon={<UnderlineOutlined />}
                onClick={() => toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, itemType, 'underline')}
                size="small"
                disabled={disabled}
            />
        </>
    );
};

export default FontDecorationPicker;