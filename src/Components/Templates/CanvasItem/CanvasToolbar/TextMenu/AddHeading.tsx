import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextFieldIcon from "@mui/icons-material/TitleOutlined";
import { HeadingObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createHeadingdObj } from "../../../../../utils/types/ShapesFactory";


const AddHeading = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddTextField = () => {
        setAnchorEl(null);

        const newHeading: HeadingObj = createHeadingdObj('Text Field ', 20, 'black', 'Arial', 'normal', '');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading]
        });
    }

    return (
        <Tooltip title="Add Heading" placement="right">
            <MenuItem onClick={handleAddTextField}>
                <AddTextFieldIcon /> Heading
            </MenuItem>
        </Tooltip>
    )
}

export default AddHeading;