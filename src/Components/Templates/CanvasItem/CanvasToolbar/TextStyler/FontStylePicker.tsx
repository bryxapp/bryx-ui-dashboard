import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const FONT_STYLES = ['normal', 'italic', 'bold'];

export default function FontStylePicker({ canvasDesign, setCanvasDesign, selectedId }: any) {

    const handleFontStyleChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontStyle: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontStyle: event.target.value as string,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontStyle = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.fontStyle || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.fontStyle;

    return (
        <>
            <Select
                value={selectedTextItemFontStyle || ''}
                onChange={handleFontStyleChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
            >
                {FONT_STYLES.map((fontStyle) => (
                    <MenuItem key={fontStyle} value={fontStyle}>
                        {fontStyle}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}