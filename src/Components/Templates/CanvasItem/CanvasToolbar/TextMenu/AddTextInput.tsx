import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextInputIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { TextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { createTextInputObj } from "../../../../../utils/types/ShapesFactory";


const AddTextInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddTextInput = () => {
        setAnchorEl(null);

        const newTextInput: TextInputObj = createTextInputObj(canvasDesign.Shapes.length, 'Text Input', 20, 'black', 'Arial', 'normal', '');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTextInput]
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