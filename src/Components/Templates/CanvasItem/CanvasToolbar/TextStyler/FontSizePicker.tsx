import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface FontSizePickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

export default function FontSizePicker({ canvasDesign, setCanvasDesign, selectedId }: FontSizePickerProps) {

    const handleFontSizeChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape:ShapeObj) => {
                if (shape.id === selectedId) {
                    return {
                        ...shape,
                        fontSize: event.target.value as number,
                    };
                }
                return shape;
            })
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontSize = canvasDesign.Shapes.find((shape: ShapeObj): shape is TextInputObj | TextFieldObj => shape.id === selectedId)?.fontSize;

    return (
        <>
            <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                Font Size
            </Typography>
            <Select
                value={selectedTextItemFontSize || ''}
                onChange={handleFontSizeChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
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