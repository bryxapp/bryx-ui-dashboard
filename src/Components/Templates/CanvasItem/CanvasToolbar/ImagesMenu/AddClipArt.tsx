import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddClipArtIcon from "@mui/icons-material/AddPhotoAlternate";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";
import { ImageObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";

const AddClipArt = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {



    const handleAddClipArt = () => {
        setAnchorEl(null);
        const newImage: ImageObj = {
            id: `image-${canvasDesign.Images.length}`,
            x: getWebCanvasWidth() / 2,
            y: getWebCanvasHeight() / 2,
            src: 'https://konvajs.org/assets/yoda.jpg',
            isDragging: false,
            rotation: 0,
            width: 200,
            height: 50,
        };

        setCanvasDesign({
            ...canvasDesign,
            Images: [
                ...canvasDesign.Images,
                newImage
            ]
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