import Tooltip from "@mui/material/Tooltip";
import AddRectangleIcon from "@mui/icons-material/RectangleOutlined";
import MenuItem from "@mui/material/MenuItem";
import { RectangleObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createRectangleObj } from "../../../../../utils/types/ShapesFactory";

const AddRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddRectangle = () => {
        setAnchorEl(null);

        const newRectangle: RectangleObj = createRectangleObj(canvasDesign.Shapes.length, 200, 300, '#CDB38B');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    }

    return (

        <Tooltip title="Add Rectangle" placement="right">
            <MenuItem onClick={handleAddRectangle}>
                <AddRectangleIcon />
            </MenuItem>
        </Tooltip>

    )
}

export default AddRectangle;