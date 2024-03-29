import Tooltip from "@mui/material/Tooltip";
import AddRoundedRectangleIcon from "@mui/icons-material/Crop75Outlined";
import MenuItem from "@mui/material/MenuItem";
import { RectangleObj } from "../../../../../utils/types/CanvasInterfaces";
import { createRoundedRectangleObj } from "../../../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";

const AddRoundedRectangle = ({ setAnchorEl }: any) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const handleAddRoundedRectangle = () => {
        setAnchorEl(null);
        const newRectangle: RectangleObj = createRoundedRectangleObj(300, 200, '#00fff0', '', 1, 20);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    }

    return (

        <Tooltip title="Add Rounded Rectangle" placement="right">
            <MenuItem onClick={handleAddRoundedRectangle}>
                <AddRoundedRectangleIcon />
            </MenuItem>
        </Tooltip>

    )
}

export default AddRoundedRectangle;