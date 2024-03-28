import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';

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
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontFamilyPicker({ textObj, itemType, canvasDesign, setCanvasDesign }: FontFamilyPickerProps) {

    const handleFontFamilyChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fontFamily', event.target.value, canvasDesign.selectedId);
    };

    const selectedTextItemFontFamily = textObj.fontFamily
    if (!selectedTextItemFontFamily) return null;

    return (
        <>
            <Typography variant="body1">
                Font
            </Typography>
            <Select
                value={selectedTextItemFontFamily || ''}
                onChange={handleFontFamilyChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '7rem', margin: 10 }}
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
        </>
    );
}