import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteShape } from '../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';

export default function DeleteButton() {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const handleDeleteShape = () => {
        deleteShape({ canvasDesign, setCanvasDesign });
    }

    return (
        <Tooltip title="Delete Shape" placement="bottom">
            <span>
                <IconButton color="inherit" aria-label="menu" onClick={handleDeleteShape}>
                    <DeleteIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
