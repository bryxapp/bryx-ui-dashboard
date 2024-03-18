import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextFieldIcon from "@mui/icons-material/TitleOutlined";
import { TextFieldObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createTextFieldObj } from "../../../../../utils/types/ShapesFactory";


const AddTextField = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddTextField = () => {
        setAnchorEl(null);

        const newTextField: TextFieldObj = createTextFieldObj('Text Field ', 20, 'black', 'Arial', 'normal', '', false);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTextField]
        });
    }

    return (
        <Tooltip title="Add Text Field" placement="right">
            <MenuItem onClick={handleAddTextField}>
                <AddTextFieldIcon />Text Field
            </MenuItem>
        </Tooltip>
    )
}

export default AddTextField;