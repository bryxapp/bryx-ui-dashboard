import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({ isLoading, canvasDesign, setCanvasDesign }: any) {
    const handleDeleteShape = () => {
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach((shapeType: string) => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].filter((shape: any) => shape.id !== canvasDesign.selectedId);
        });
        canvasDesign.selectedId = null;
        setCanvasDesign(updatedCanvasDesign);
    }

    return (
        <Tooltip title="Delete Shape" placement="bottom">
            <IconButton color="inherit" aria-label="menu" onClick={handleDeleteShape} disabled={isLoading || !canvasDesign.selectedId}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
}
