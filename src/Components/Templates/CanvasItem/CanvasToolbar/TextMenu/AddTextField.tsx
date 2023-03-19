import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextFieldIcon from "@mui/icons-material/TitleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";
import { textFieldObj } from "../../../../../Utils/types/ShapeInterfaces";

const AddTextField = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddTextField = () => {
        setAnchorEl(null);

        const newTextField: textFieldObj = {
            id: 'textField-' + canvasDesign.TextFields.length,
            value: 'Text Field ' + canvasDesign.TextFields.length,
            x: getWebCanvasWidth() / 6,
            y: getWebCanvasHeight() / 2.5,
            fill: "black",
            fontSize: 20,
            rotation: 0,
            isDragging: false,
        }


        setCanvasDesign({
            ...canvasDesign,
            TextFields: [
                ...canvasDesign.TextFields,
                newTextField
            ]
        });
    }

    return (
        <Tooltip title="Add Text Field" placement="right">
            <MenuItem onClick={handleAddTextField}>
                <AddTextFieldIcon />Text Field
            </MenuItem>
        </Tooltip>
    )
}

export default AddTextField;