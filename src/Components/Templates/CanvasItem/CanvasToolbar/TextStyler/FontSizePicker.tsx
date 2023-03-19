import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];


export default function FontSizePicker({ canvasDesign, setCanvasDesign, selectedId }: any) {

    const handleFontSizeChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontSize: event.target.value as number,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontSize: event.target.value as number,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontSize = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.fontSize || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.fontSize;

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