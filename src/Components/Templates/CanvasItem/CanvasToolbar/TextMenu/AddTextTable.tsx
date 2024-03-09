import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextTableIcon from "@mui/icons-material/BorderAll";
import { TextTableObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createTextTableObj } from "../../../../../utils/types/ShapesFactory";


const AddTextTable = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddTextTable = () => {
        setAnchorEl(null);

        const newTextTable: TextTableObj = createTextTableObj(3, 3, 200, 80);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTextTable]
        });
    }

    return (
        <Tooltip title="Add Text Field" placement="right">
            <MenuItem onClick={handleAddTextTable}>
                <AddTextTableIcon />Text Table
            </MenuItem>
        </Tooltip>
    )
}

export default AddTextTable;