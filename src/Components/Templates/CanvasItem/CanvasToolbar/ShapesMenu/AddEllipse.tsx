import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddEllipseIcon from "@mui/icons-material/CircleOutlined";
import { EllipseObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createEllipseObj } from "../../../../../utils/types/ShapesFactory";


const AddEllipse = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddEllipse = () => {
        setAnchorEl(null);

        const newEllipse: EllipseObj = createEllipseObj(100, 100, '#355E3B', '', 1);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEllipse]
        });
    }

    return (
        <Tooltip title="Add Ellipse" placement="right">
            <MenuItem onClick={handleAddEllipse}>
                <AddEllipseIcon />
            </MenuItem>
        </Tooltip>
    )
}

export default AddEllipse;