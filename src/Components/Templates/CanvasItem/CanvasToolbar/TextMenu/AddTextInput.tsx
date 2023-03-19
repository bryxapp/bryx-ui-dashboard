import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextInputIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";
import { textInputObj } from "../../../../../Utils/types/ShapeInterfaces";

const AddTextInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddTextInput = () => {
        setAnchorEl(null);

        const newTextInput: textInputObj = {
            id: 'textInput-' + canvasDesign.TextInputs.length,
            displayName: 'Text Input ' + canvasDesign.TextInputs.length,
            x: getWebCanvasWidth() / 6,
            y: getWebCanvasHeight() / 2.5,
            fill: '#00000',
            fontSize: 20,
            rotation: 0,
            isDragging: false,
        }

        setCanvasDesign({
            ...canvasDesign,
            TextInputs: [
                ...canvasDesign.TextInputs,
                newTextInput
            ]
        });
    }

    return (
        <Tooltip title="Add Text Input" placement="right">
            <MenuItem onClick={handleAddTextInput}>
                <AddTextInputIcon /> Text Input
            </MenuItem>
        </Tooltip>
    )
}

export default AddTextInput;