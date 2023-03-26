import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddClipArtIcon from "@mui/icons-material/AddPhotoAlternate";
import { ImageObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createImageObj } from "../../../../../utils/types/ShapesFactory";

const AddClipArt = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddClipArt = () => {
        setAnchorEl(null);

        const newImage: ImageObj = createImageObj(canvasDesign.Shapes.length, 'https://konvajs.org/assets/yoda.jpg', 200, 50);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newImage]
        });
    }

    return (
        <Tooltip title="Add ClipArt" placement="right">
            <MenuItem onClick={handleAddClipArt}>
                <AddClipArtIcon />ClipArt
            </MenuItem>
        </Tooltip>
    )
}

export default AddClipArt;