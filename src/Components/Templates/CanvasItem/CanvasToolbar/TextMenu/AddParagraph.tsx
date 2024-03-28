import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddParagraphIcon from "@mui/icons-material/ViewHeadline";
import { ParagraphObj, ToolBarProps } from "../../../../../utils/types/CanvasInterfaces";
import { createParagraphObj } from "../../../../../utils/types/ShapesFactory";


const AddParagraph = ({ canvasDesign, setCanvasDesign, setAnchorEl }: ToolBarProps) => {
    const handleAddParagraph = () => {
        setAnchorEl(null);

        const newParagraph: ParagraphObj = createParagraphObj('Paragraph', 12, 'black', 'Arial', 'normal', '');

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newParagraph]
        });
    }

    return (
        <Tooltip title="Add Paragraph" placement="right">
            <MenuItem onClick={handleAddParagraph}>
                <AddParagraphIcon /> Paragraph
            </MenuItem>
        </Tooltip>
    )
}

export default AddParagraph;