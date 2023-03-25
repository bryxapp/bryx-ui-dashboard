import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddTextFieldIcon from "@mui/icons-material/TitleOutlined";
import { getWebCanvasHeight, getWebCanvasWidth } from "../../../../../utils/page-util";
import { TextFieldObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";

const AddTextField = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddTextField = () => {
        setAnchorEl(null);

        const newTextField: TextFieldObj = {
            id: 'textField-' + canvasDesign.TextFields.length,
            value: 'Text Field ' + canvasDesign.TextFields.length,
            x: getWebCanvasWidth() / 6,
            y: getWebCanvasHeight() / 2.5,
            fill: "black",
            fontSize: 20,
            rotation: 0,
            isDragging: false,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            textDecoration: ''
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