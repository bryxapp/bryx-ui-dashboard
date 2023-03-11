import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const TextInputManager = ({ canvasDesign, setCanvasDesign }: any) => {

    const handleInputChange = (event: any, textInputId: string) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === textInputId) {
                    return {
                        ...textInput,
                        displayName: event.target.value,
                    };
                } else {
                    return textInput;
                }
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "15rem" }}>
            <Typography variant="h5">Text Input Manager</Typography>
            <Typography variant="body1" color={"gray"}>
                Edit your text input names here
            </Typography>

            {canvasDesign.TextInputs !== 0 && canvasDesign.TextInputs.map((textInput: any) => {
                return (
                    <TextField
                        key={textInput.id}
                        id={textInput.id}
                        value={textInput.displayName}
                        onChange={(event) => handleInputChange(event, textInput.id)}
                        variant="outlined"
                        margin="normal"
                    />
                );
            })}
            {canvasDesign.TextInputs.length === 0 && (
                <>
                    <div style={{ height: "2rem" }} />
                    <Typography variant="body1" align="center">
                        No text inputs found
                    </Typography>
                    <div style={{ height: ".25rem" }} />
                    <Typography variant="body1" align="center">
                        Add text inputs to your canvas to edit their names here
                    </Typography>
                </>
            )}
        </div>
    );
};

export default TextInputManager;
