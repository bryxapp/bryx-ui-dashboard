import TextField from "@mui/material/TextField";
import { textObj } from "../../../../../Utils/types/ShapeInterfaces";
import { TemplateCreationState } from "../../../../../Utils/types/TemplateCreationInterfaces";
import TextCustomizer from "./TextCustomizer/TextCustomizer";

interface TextInputItemProps {
    textInput: textObj;
    canvasDesign: TemplateCreationState
    setCanvasDesign: React.Dispatch<React.SetStateAction<TemplateCreationState>>
}

const TextInputItem = (props: TextInputItemProps) => {

    const handleDisplayNameChange = (event: any, textInputId: string) => {
        const updatedCanvasDesign = {
            ...props.canvasDesign,
            TextInputs: props.canvasDesign.TextInputs.map((textInput: any) => {
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
        props.setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <div key={props.textInput.id} style={{ display: "flex", alignItems: "center" }}>
            <TextField
                id={`${props.textInput.id}-name`}
                label="Name"
                value={props.textInput.displayName}
                onChange={(event) => handleDisplayNameChange(event, props.textInput.id)}
                variant="outlined"
            />
            <TextCustomizer textInput={props.textInput} canvasDesign={props.canvasDesign} setCanvasDesign={props.setCanvasDesign} />
        </div>
    )
}

export default TextInputItem;