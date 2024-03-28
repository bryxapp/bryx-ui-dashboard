import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface FontSizePickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontSizePicker({ textObj, itemType, canvasDesign, setCanvasDesign }: FontSizePickerProps) {

    const handleFontSizeChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fontSize', event.target.value, canvasDesign.selectedId);
    };


    return (
        <>
            <Typography variant="body1">
                Font Size
            </Typography>
            <Select
                value={textObj.fontSize || ''}
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