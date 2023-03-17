import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddLineIcon from "@mui/icons-material/HorizontalRule";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";
import { lineObj } from "../../../../../Utils/types/ShapeInterfaces";

const AddRectangle = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {

    const handleAddLine = () => {
        setAnchorEl(null);

        const newLine: lineObj = {
            id: 'line-' + canvasDesign.Lines.length,
            x: getWebCanvasWidth() / 2,
            y: getWebCanvasHeight() / 2,
            points: [0, 0, 200, 0],
            stroke: '#7F8274',
            strokeWidth: 8,
            rotation: 0,
            isDragging: false,
        }

        console.log(newLine)

        setCanvasDesign({
            ...canvasDesign,
            Lines: [
                ...canvasDesign.Lines,
                newLine
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