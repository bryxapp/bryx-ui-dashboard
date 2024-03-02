import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

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
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontFamilyPicker({ canvasDesign, setCanvasDesign }: FontFamilyPickerProps) {

    const handleFontFamilyChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'fontFamily', event.target.value, canvasDesign.selectedId)
    };

    const selectedTextItemFontFamily = (findShape(canvasDesign, canvasDesign.selectedId) as TextInputObj | TextFieldObj)?.fontFamily

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