import { useNavigate } from 'react-router-dom';
import { isTemplateChanged } from '../../../../utils/functions/CanvasFunctions';
import { Button, Typography } from '@mui/material';


interface CloseTemplateButtonProps {
    dataBaseCanvasDesign: any;
    canvasDesign: any;
    friendlyName: string;
    databaseFriendlyName: string;
}

export default function CloseTemplateButton({ dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName }: CloseTemplateButtonProps) {

    const navigate = useNavigate();
    const handleClose = async () => {
        if (isTemplateChanged(dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName)) {
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