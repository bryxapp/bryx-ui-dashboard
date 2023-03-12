import Tooltip from "@mui/material/Tooltip";
import AddRectangleIcon from "@mui/icons-material/RectangleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";
import MenuItem from "@mui/material/MenuItem";

const AddRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddRectangle = () => {
        setAnchorEl(null);

        const newRectangle = {
            id: 'rect-' + canvasDesign.Rectangles.length,
            x: getWebCanvasWidth() / 2,
            y: getWebCanvasHeight() / 2,
            height: 300,
            width: 200,
            fill: '#CDB38B',
            isDragging: false,
        }

        console.log(newRectangle)

        setCanvasDesign({
            ...canvasDesign,
            Rectangles: [
                ...canvasDesign.Rectangles,
                newRectangle
            ]
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