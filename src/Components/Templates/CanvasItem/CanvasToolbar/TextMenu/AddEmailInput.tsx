import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddEmailInputIcon from "@mui/icons-material/EmailOutlined";
import { CanvasDesignData, EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { createEmailInputObj } from "../../../../../utils/types/ShapesFactory";

interface AddEmailInputProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    setAnchorEl: React.SetStateAction<any>;
}

const AddEmailInput = ({ canvasDesign, setCanvasDesign, setAnchorEl }: AddEmailInputProps) => {
    const handleAddEmailInput = () => {
        setAnchorEl(null);
        const newEmailInput: EmailInputObj = createEmailInputObj('Email', true, "john.doe@email.com", 20, 'black', 'Arial', 'normal', '', false);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEmailInput]
        });
    }

    return (
        <Tooltip title="Add Email Input" placement="right">
            <MenuItem onClick={handleAddEmailInput}>
                <AddEmailInputIcon /> Email Input
            </MenuItem>
        </Tooltip>
    )
}

export default AddEmailInput;