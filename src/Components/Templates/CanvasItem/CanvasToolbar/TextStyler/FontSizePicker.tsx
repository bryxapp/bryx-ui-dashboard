import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import { getTextShape, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface FontSizePickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontSizePicker({ canvasDesign, setCanvasDesign }: FontSizePickerProps) {

    const selectedTextItemFontSize = (getTextShape(canvasDesign, canvasDesign.selectedId))?.fontSize;
    if (!selectedTextItemFontSize) return null;

    const handleFontSizeChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'fontSize', event.target.value, canvasDesign.selectedId)
    };


    return (
        <>
            <Typography variant="body1">
                Font Size
            </Typography>
            <Select
                value={selectedTextItemFontSize || ''}
                onChange={handleFontSizeChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '4.5rem', margin: 10 }}
                size='small'
            >
                {FONT_SIZES.map((fontSize) => (
                    <MenuItem key={fontSize} value={fontSize}>
                        {fontSize}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}