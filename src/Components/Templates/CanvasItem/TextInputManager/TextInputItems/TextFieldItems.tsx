import Typography from "@mui/material/Typography"
import { textFieldObj } from "../../../../../Utils/types/ShapeInterfaces";
import { TemplateCreationState } from "../../../../../Utils/types/TemplateCreationInterfaces";
import TextCustomizer from "./TextCustomizer/TextCustomizer";

interface TextFieldItemProps {
    textField: textFieldObj;
    canvasDesign: TemplateCreationState
    setCanvasDesign: React.Dispatch<React.SetStateAction<TemplateCreationState>>
}

const TextFieldItem = (props: TextFieldItemProps) => {

    const trunctateText = (text: string | null) => {
        //Return the first characters as label
        if (text) {
            return text.slice(0, 15)
        }
    }

    return (
        <div key={props.textField.id} style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">{trunctateText(props.textField.value)}</Typography>
            <TextCustomizer textInput={props.textField} canvasDesign={props.canvasDesign} setCanvasDesign={props.setCanvasDesign} />
        </div>
    )
}

export default TextFieldItem;