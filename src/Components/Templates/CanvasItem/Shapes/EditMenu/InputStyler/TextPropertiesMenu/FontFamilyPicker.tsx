import { Select, Typography } from 'antd';
import { TextBase } from '../../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty, updateShapeProperty } from '../../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../../utils/contexts/canvasDesignContext';

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
    itemType: 'content' | 'label' | null;
}

export default function FontFamilyPicker({ textObj, itemType }: FontFamilyPickerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleFontFamilyChange = (value: string) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fontFamily', value, selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fontFamily', value, selectedId);
        }
    };

    const selectedTextItemFontFamily = textObj.fontFamily
    if (!selectedTextItemFontFamily) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text>
                Font
            </Typography.Text>
            <Select
                value={selectedTextItemFontFamily || ''}
                onChange={handleFontFamilyChange}
                size='small'
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ maxHeight: 250 }}
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