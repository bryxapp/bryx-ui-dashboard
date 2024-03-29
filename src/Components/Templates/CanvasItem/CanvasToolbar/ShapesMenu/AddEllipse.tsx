import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddEllipseIcon from "@mui/icons-material/CircleOutlined";
import { EllipseObj } from "../../../../../utils/types/CanvasInterfaces";
import { createEllipseObj } from "../../../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";


const AddEllipse = ({ setAnchorEl }: any) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
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