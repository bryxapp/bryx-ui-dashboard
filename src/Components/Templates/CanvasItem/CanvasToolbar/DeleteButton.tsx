import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CanvasDesignData } from '../../../../utils/types/CanvasInterfaces';
import { deleteShape } from '../../../../utils/functions/CanvasFunctions';

interface DeleteButtonProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function DeleteButton({ isLoading, canvasDesign, setCanvasDesign }: DeleteButtonProps) {
    const handleDeleteShape = () => {
        deleteShape({ canvasDesign, setCanvasDesign });
    }

    return (
        <Tooltip title="Delete Shape" placement="bottom">
            <span>
                <IconButton color="inherit" aria-label="menu" onClick={handleDeleteShape} disabled={isLoading || !canvasDesign.selectedId}>
                    <DeleteIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}
