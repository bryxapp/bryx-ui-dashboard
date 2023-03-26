import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/CircleOutlined";
import { CircleObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createCircleObj } from "../../../../../utils/types/ShapesFactory";


const AddCircle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddCircle = () => {
        setAnchorEl(null);

        const newCircle: CircleObj = createCircleObj(canvasDesign.Shapes.length, 100, '#355E3B');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newCircle]
        });
    }

    return (
        <Tooltip title="Add Circle" placement="right">
            <MenuItem onClick={handleAddCircle}>
                <AddCircleIcon />
            </MenuItem>
        </Tooltip>
    )
}

export default AddCircle;