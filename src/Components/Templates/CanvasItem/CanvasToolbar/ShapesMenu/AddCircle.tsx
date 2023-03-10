import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/CircleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";

const AddCircle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddCircle = () => {
        setAnchorEl(null);

        const newCircle = {
            id: 'circle-' + canvasDesign.Circles.length,
            x: getWebCanvasWidth() / 2,
            y: getWebCanvasHeight() / 2,
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