import Tooltip from "@mui/material/Tooltip";
import AddRectangleIcon from "@mui/icons-material/RectangleOutlined";
import MenuItem from "@mui/material/MenuItem";
import { RectangleObj } from "../../../../../utils/types/CanvasInterfaces";
import { createRectangleObj } from "../../../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";

const AddRectangle = ({ setAnchorEl }: any) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    
    const handleAddRectangle = () => {
        setAnchorEl(null);

        const newRectangle: RectangleObj = createRectangleObj(200, 300, '#CDB38B', '', 1);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
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