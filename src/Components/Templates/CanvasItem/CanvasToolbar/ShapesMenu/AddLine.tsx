import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddLineIcon from "@mui/icons-material/HorizontalRule";
import { LineObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createLineObj } from "../../../../../utils/types/ShapesFactory";

const AddLine = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {

    const handleAddLine = () => {
        setAnchorEl(null);

        const newLine: LineObj = createLineObj([0, 0, 200, 0], '#7F8274', 8);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newLine]
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

export default AddLine;