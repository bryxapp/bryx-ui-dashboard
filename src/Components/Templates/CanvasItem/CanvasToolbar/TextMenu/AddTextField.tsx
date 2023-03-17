import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextFieldIcon from "@mui/icons-material/TitleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../Utils/page-util";
import { textFieldObj } from "../../../../../Utils/types/ShapeInterfaces";

const AddTextField = ({ canvasDesign, setCanvasDesign, setAnchorEl }: any) => {
    const handleAddTextField = () => {
        setAnchorEl(null);

        const newTextField: textFieldObj = {
            id: 'text-' + canvasDesign.TextFields.length,
            value: 'Text Field ' + canvasDesign.TextFields.length,
            x: getWebCanvasWidth() / 6,
            y: getWebCanvasHeight() / 2.5,
            width: 200,
            height: 50,
            fontColor: "blue",
            fontSize: 20,
            isDragging: false,
        }


        setCanvasDesign({
            ...canvasDesign,
            TextFields: [
                ...canvasDesign.Circles,
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