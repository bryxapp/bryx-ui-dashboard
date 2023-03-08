import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddLineIcon from "@mui/icons-material/HorizontalRule";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";

const AddRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {

    const handleAddLine = () => {
        setAnchorEl(null);
        setCanvasDesign({
            ...canvasDesign,
            Lines: [
                ...canvasDesign.Lines,
                {
                    id: 'line-' + canvasDesign.Lines.length,
                    points: [getWebCanvasWidth() / 5, getWebCanvasHeight() / 5, getWebCanvasWidth() / 2, getWebCanvasHeight() / 5],
                    stroke: '#7F8274',
                    strokeWidth: 8,
                    isDragging: false,
                }
            ]
        });
    }

    return (
        <Tooltip title="Add Line" placement="right">
            <MenuItem onClick={handleAddLine}>
                <AddLineIcon />
            </MenuItem>
        </Tooltip>
    )
}

export default AddRectangle;