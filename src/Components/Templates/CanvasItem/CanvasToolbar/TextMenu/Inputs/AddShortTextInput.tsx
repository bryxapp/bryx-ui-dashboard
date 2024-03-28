import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShortTextIcon from '@mui/icons-material/ShortText';
import { CanvasDesignData, ShortTextInputObj } from "../../../../../../utils/types/CanvasInterfaces";
import { createShortTextInputObj } from "../../../../../../utils/types/ShapesFactory";

interface AddShortTextInputProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    setAnchorEl: React.SetStateAction<any>;
}

const AddShortTextInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: AddShortTextInputProps) => {
    const handleAddShortTextInput = () => {
        setAnchorEl(null);
        const newShortTextInput: ShortTextInputObj = createShortTextInputObj('Input', true, "Short Text", 20, 'black', 'Arial', 'normal', '', false);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newShortTextInput]
        });
    }

    return (
        <Tooltip title="Add Email Input" placement="right">
            <MenuItem onClick={handleAddShortTextInput}>
                <ShortTextIcon /> Short Text Input
            </MenuItem>
        </Tooltip>
    )
}

export default AddShortTextInput;