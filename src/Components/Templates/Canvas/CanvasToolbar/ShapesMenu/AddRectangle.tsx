import Tooltip from "@mui/material/Tooltip";
import AddRectangleIcon from "@mui/icons-material/RectangleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";
import MenuItem from "@mui/material/MenuItem";

const AddRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddRectangle = () => {
        setAnchorEl(null);
        setCanvasDesign({
            ...canvasDesign,
            Rectangles: [
                ...canvasDesign.Rectangles,
                {
                    id: 'rect-' + canvasDesign.Rectangles.length,
                    x: getWebCanvasWidth() / 4,
                    y: getWebCanvasHeight() / 6,
                    height: 300,
                    width: 200,
                    fill: '#CDB38B',
                    isDragging: false,
                }
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