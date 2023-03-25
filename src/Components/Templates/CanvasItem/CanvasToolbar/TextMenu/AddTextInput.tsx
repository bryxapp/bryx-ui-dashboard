import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextInputIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";
import { TextInputObj } from "../../../../../utils/types/CanvasInterfaces";

const AddTextInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddTextInput = () => {
        setAnchorEl(null);

        const newTextInput: TextInputObj = {
            id: 'textInput-' + canvasDesign.TextInputs.length,
            displayName: 'Text Input ' + canvasDesign.TextInputs.length,
            x: getWebCanvasWidth() / 6,
            y: getWebCanvasHeight() / 2.5,
            fill: '#00000',
            fontSize: 20,
            rotation: 0,
            isDragging: false,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            textDecoration: ''
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