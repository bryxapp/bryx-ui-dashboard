import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddHeadingIcon from "@mui/icons-material/Title";
import { HeadingObj } from "../../../../../utils/types/CanvasInterfaces";
import { createHeadingdObj } from "../../../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";


const AddHeading = ({ setAnchorEl }: any) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const handleAddHeading = () => {
        setAnchorEl(null);

        const newHeading: HeadingObj = createHeadingdObj('Heading', 20, 'black', 'Arial', 'normal', '');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading]
        });
    }

    return (
        <Tooltip title="Add Heading" placement="right">
            <MenuItem onClick={handleAddHeading}>
                <AddHeadingIcon /> Heading
            </MenuItem>
        </Tooltip>
    )
}

export default AddHeading;