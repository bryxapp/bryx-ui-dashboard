import { Select } from 'antd';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

const { Option } = Select;

const FONTS = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Tahoma',
    'Comic Sans MS',
    'Impact',
    'Lucida Console',
    'Arial Narrow',
    'Book Antiqua',
    'Century Gothic',
    // Add more fonts here
];

interface FontFamilyPickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

export default function FontFamilyPicker({ textObj, disabled }: FontFamilyPickerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleFontFamilyChange = (value: string) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'fontFamily', value, selectedId);

    };

    const selectedTextItemFontFamily = textObj.fontFamily
    if (!selectedTextItemFontFamily) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Select
                value={selectedTextItemFontFamily || ''}
                onChange={handleFontFamilyChange}
                size='small'
                popupMatchSelectWidth={false}
                dropdownStyle={{ maxHeight: 250 }}
                disabled={disabled}
            >
                {FONTS.map((fontFamily) => (
                    <Option key={fontFamily} value={fontFamily} style={{ fontFamily: fontFamily }}>
                        {fontFamily}
                    </Option>
                ))}
            </Select>
        </div>
    );
}