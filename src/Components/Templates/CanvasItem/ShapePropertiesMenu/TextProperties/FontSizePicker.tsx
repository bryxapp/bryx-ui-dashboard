import { Select } from 'antd';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateCellContentProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

const { Option } = Select;

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface FontSizePickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

export default function FontSizePicker({ textObj, disabled }: FontSizePickerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const handleFontSizeChange = (value: string | number) => {
        if (value === null) return;
        if (textObj.type === 'CellInput' || textObj.type === 'TextCell') {
            updateCellContentProperty(canvasDesign, setCanvasDesign, 'fontSize', value, selectedId);
            return;
        }
        updateShapeProperty(canvasDesign, setCanvasDesign, 'fontSize', value, selectedId);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '.5rem' }}>
            <Select
                value={textObj.fontSize || ''}
                onChange={handleFontSizeChange}
                style={{ minWidth: '4.5rem' }}
                size='small'
                disabled={disabled}
            >
                {FONT_SIZES.map((fontSize) => (
                    <Option key={fontSize} value={fontSize}>
                        {fontSize}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
