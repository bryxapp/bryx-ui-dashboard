import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';

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
    itemType: 'content' | 'label' | null
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontFamilyPicker({ textObj, itemType, canvasDesign, setCanvasDesign }: FontFamilyPickerProps) {

    const handleFontFamilyChange = (event: any) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fontFamily', event.target.value, canvasDesign.selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fontFamily', event.target.value, canvasDesign.selectedId);
        }
    };

    const selectedTextItemFontFamily = textObj.fontFamily
    if (!selectedTextItemFontFamily) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1">
                Font
            </Typography>
            <Select
                value={selectedTextItemFontFamily || ''}
                onChange={handleFontFamilyChange}
                variant="outlined"
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 250, // Adjust as needed
                        },
                    },
                }}
                size='small'
            >
                {FONTS.map((fontFamily) => (
                    <MenuItem key={fontFamily} value={fontFamily} style={{ fontFamily: fontFamily }}>
                        {fontFamily}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}