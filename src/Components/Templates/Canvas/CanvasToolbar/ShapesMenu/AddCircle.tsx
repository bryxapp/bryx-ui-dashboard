import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/CircleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";

const AddCircle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddCircle = () => {
        setAnchorEl(null);
        setCanvasDesign({
            ...canvasDesign,
            Circles: [
                ...canvasDesign.Circles,
                {
                    id: 'circle-' + canvasDesign.Circles.length,
                    x: getWebCanvasWidth() / 2,
                    y: getWebCanvasHeight() / 2,
                    radius: 100,
                    fill: '#355E3B',
                    isDragging: false,
                }
            ]
        });
    }

    return (
        <Tooltip title="Add Circle" placement="right">
            <AddCircleIcon onClick={handleAddCircle} />
        </Tooltip>
    )
}

export default AddCircle;