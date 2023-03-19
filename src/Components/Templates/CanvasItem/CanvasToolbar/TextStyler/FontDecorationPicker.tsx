import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const TEXT_DECORATIONS = ['none', 'underline', 'line-through'];


export default function FontDecorationPicker({ canvasDesign, setCanvasDesign, selectedId }: any) {

    const handleTextDecorationChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        textDecoration: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        textDecoration: event.target.value as string,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };


    const selectedTextItemTextDecoration = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.textDecoration || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.textDecoration;

    return (
        <>
            <Select
                value={selectedTextItemTextDecoration || ''}
                onChange={handleTextDecorationChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
            >
                {TEXT_DECORATIONS.map((textDecoration) => (
                    <MenuItem key={textDecoration} value={textDecoration}>
                        {textDecoration}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}