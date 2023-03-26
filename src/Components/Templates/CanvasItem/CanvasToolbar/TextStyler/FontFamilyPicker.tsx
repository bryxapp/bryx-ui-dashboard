import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

const FONTS = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'];

interface FontFamilyPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

export default function FontFamilyPicker({ canvasDesign, setCanvasDesign, selectedId }: FontFamilyPickerProps) {

    const handleFontFamilyChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
                    return {
                        ...shape,
                        fontFamily: event.target.value as string,
                    };
                }
                return shape;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontFamily = canvasDesign.Shapes.find((shape: ShapeObj): shape is TextInputObj | TextFieldObj => shape.id === selectedId)?.fontFamily;

    return (
        <>
            <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                Font
            </Typography>
            <Select
                value={selectedTextItemFontFamily || ''}
                onChange={handleFontFamilyChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
            >
                {FONTS.map((fontFamily) => (
                    <MenuItem key={fontFamily} value={fontFamily}>
                        {fontFamily}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}