import { useNavigate } from 'react-router-dom';
import { isDesignChanged } from '../../../../utils/functions/CanvasFunctions';
import { Button } from '@mui/material';


interface CloseTemplateButtonProps {
    dataBaseCanvasDesign: any;
    canvasDesign: any;
}

export default function CloseTemplateButton({ dataBaseCanvasDesign, canvasDesign }: CloseTemplateButtonProps) {

    const navigate = useNavigate();
    const handleClose = async () => {
        if (isDesignChanged(dataBaseCanvasDesign, canvasDesign)) {
            const result = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (!result) {
                return;
            }
        }
        navigate("/templates");
    }
    return (
        <Button color="inherit" onClick={handleClose}>
            Close
        </Button>
    );
}