import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextInputIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { CanvasDesignData, TextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { createTextInputObj } from "../../../../../utils/types/ShapesFactory";

interface AddTextInputProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    setAnchorEl: React.SetStateAction<any>;
}

const AddTextInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: AddTextInputProps) => {
    const handleAddTextInput = () => {
        setAnchorEl(null);

        const newTextInput: TextInputObj = createTextInputObj('Input', 20, 'black', 'Arial', 'normal', '');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTextInput]
        });
    }

    return (
        <Tooltip title="Add Text Input" placement="right">
            <MenuItem onClick={handleAddTextInput}>
                <AddTextInputIcon /> Text Input
            </MenuItem>
        </Tooltip>
    )
}

export default AddTextInput;