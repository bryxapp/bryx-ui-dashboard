import Typography from "@mui/material/Typography";
import TextInputItem from "./TextInputItems/TextInputItems";
import NoTextInputs from "./NoTextInputs/NoTextInputs";
import { Box } from "@mui/system";

const TextInputManager = ({ canvasDesign, setCanvasDesign }: any) => {

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "15rem" }}>
            <Typography variant="h5" align="center" >Text Input Manager</Typography>
            <Typography variant="body1" color={"gray"} align="center">
                Edit or Delete Text Inputs
            </Typography>
            <Typography variant="body1" color={"gray"} align="center">
                Customize your font size, font color, and name here
            </Typography>
            <Box sx={{ height: "1rem" }} />
            {canvasDesign.TextInputs !== 0 && canvasDesign.TextInputs.map((textInput: any) => {
                return (
                    <>
                        <TextInputItem textInput={textInput} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <Box sx={{ height: "1rem" }} />
                    </>
                );
            })}
            {canvasDesign.TextInputs.length === 0 && (
                <NoTextInputs />
            )}
        </div>
    );
};

export default TextInputManager;
