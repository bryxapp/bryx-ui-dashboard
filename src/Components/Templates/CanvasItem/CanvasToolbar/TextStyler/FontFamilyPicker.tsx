import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

const FONTS = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'];


export default function FontFamilyPicker({ canvasDesign, setCanvasDesign, selectedId }: any) {

    const handleFontFamilyChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontFamily: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
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
        (textInput: any) => textInput.id === selectedId
    )?.fontFamily || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
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