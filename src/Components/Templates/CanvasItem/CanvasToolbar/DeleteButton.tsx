import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CanvasDesignData, ShapeObj } from '../../../../utils/types/CanvasInterfaces';

interface DeleteButtonProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}
export default function DeleteButton({ isLoading, canvasDesign, setCanvasDesign }: DeleteButtonProps) {
    const handleDeleteShape = () => {
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
        canvasDesign.Shapes.forEach((shape: ShapeObj) => {
            if (shape.id === canvasDesign.selectedId) {
                updatedCanvasDesign.Shapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== canvasDesign.selectedId);
            }
        });
        canvasDesign.selectedId = null;
        setCanvasDesign(updatedCanvasDesign);
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
