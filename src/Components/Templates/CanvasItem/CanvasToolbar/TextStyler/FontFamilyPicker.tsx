import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

const FONTS = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'];

interface FontFamilyPickerProps {
    canvasDesign: any;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}

export default function FontFamilyPicker({ canvasDesign, setCanvasDesign, selectedId }: FontFamilyPickerProps) {

    const handleFontFamilyChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: TextInputObj) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontFamily: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: TextFieldObj) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontFamily: event.target.value as string,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontFamily = canvasDesign.TextInputs.find(
        (textInput: TextInputObj) => textInput.id === selectedId
    )?.fontFamily || canvasDesign.TextFields.find(
        (textField: TextFieldObj) => textField.id === selectedId
    )?.fontFamily;

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