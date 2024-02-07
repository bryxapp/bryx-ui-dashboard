import Tooltip from "@mui/material/Tooltip";
import AddRoundedRectangleIcon from "@mui/icons-material/Crop75Outlined";
import MenuItem from "@mui/material/MenuItem";
import { RectangleObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createRoundedRectangleObj } from "../../../../../utils/types/ShapesFactory";

const AddRoundedRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddRoundedRectangle = () => {
        setAnchorEl(null);
        const newRectangle: RectangleObj = createRoundedRectangleObj(300, 200, '#00fff0',undefined, 1, 20);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    }

    return (

        <Tooltip title="Add Rounded Rectangle" placement="right">
            <MenuItem onClick={handleAddRoundedRectangle}>
                <AddRoundedRectangleIcon />
            </MenuItem>
        </Tooltip>

    )
}

export default AddRoundedRectangle;