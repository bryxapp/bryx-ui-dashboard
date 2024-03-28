import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddHeadingIcon from "@mui/icons-material/Title";
import { HeadingObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createHeadingdObj } from "../../../../../utils/types/ShapesFactory";


const AddHeading = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
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