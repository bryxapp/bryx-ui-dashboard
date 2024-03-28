import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddPhoneInputIcon from "@mui/icons-material/Phone";
import { CanvasDesignData, PhoneInputObj } from "../../../../../../utils/types/CanvasInterfaces";
import { createPhoneInputObj } from "../../../../../../utils/types/ShapesFactory";

interface AddPhoneInputProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    setAnchorEl: React.SetStateAction<any>;
}

const AddPhoneInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: AddPhoneInputProps) => {
    const handleAddPhoneInput = () => {
        setAnchorEl(null);
        const newPhoneInput: PhoneInputObj = createPhoneInputObj('Phone Number #', true, "(555)555-5555", 20, 'black', 'Arial', 'normal', '', false);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newPhoneInput]
        });
    }

    return (
        <Tooltip title="Add Phone Input" placement="right">
            <MenuItem onClick={handleAddPhoneInput}>
                <AddPhoneInputIcon /> Phone Input
            </MenuItem>
        </Tooltip>
    )
}

export default AddPhoneInput;