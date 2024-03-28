import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface FontSizePickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function FontSizePicker({ textObj, itemType, canvasDesign, setCanvasDesign }: FontSizePickerProps) {

    const handleFontSizeChange = (event: any) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fontSize', event.target.value, canvasDesign.selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fontSize', event.target.value, canvasDesign.selectedId);
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '.5rem' }}>
            <Typography variant="body1">
                Font Size
            </Typography>
            <Select
                value={textObj.fontSize || ''}
                onChange={handleFontSizeChange}
                variant="outlined"
                style={{ minWidth: '4.5rem' }}
                size='small'
            >
                {FONT_SIZES.map((fontSize) => (
                    <MenuItem key={fontSize} value={fontSize}>
                        {fontSize}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}