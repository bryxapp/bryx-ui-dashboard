import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/CircleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";
import { CircleObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";

const AddCircle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddCircle = () => {
        setAnchorEl(null);

        const newCircle: CircleObj = {
            id: 'circle-' + canvasDesign.Circles.length,
            x: getWebCanvasWidth() / 2,
            y: getWebCanvasHeight() / 2,
            rotation: 0,
            radius: 100,
            fill: '#355E3B',
            isDragging: false,
        }

        setCanvasDesign({
            ...canvasDesign,
            Circles: [
                ...canvasDesign.Circles,
                newCircle
            ]
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