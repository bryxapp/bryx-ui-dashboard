import { useNavigate } from 'react-router-dom';
import { isDesignChanged } from '../../../../utils/functions/CanvasFunctions';
import { Button, Typography } from '@mui/material';


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
        <Button color="inherit" onClick={handleClose}
        sx={{
            padding: '0 10px',
            margin: '0 5px',
            borderColor: 'white',
            borderWidth: 1,
            borderStyle: 'solid',
            '&:hover': {
                borderColor: 'white',
                borderWidth: 2,
            },
        }}
    >
        <Typography variant="h6">
        Close
        </Typography>
        </Button>
    );
}