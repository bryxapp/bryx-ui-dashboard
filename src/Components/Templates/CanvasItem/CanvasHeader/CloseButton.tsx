import { useNavigate } from 'react-router-dom';
import { isTemplateChanged } from '../../../../utils/canvasUtils';
import { Button } from 'antd';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';

interface CloseTemplateButtonProps {
    dataBaseCanvasDesign: any;
    friendlyName: string;
    databaseFriendlyName: string;
}

export default function CloseTemplateButton({ dataBaseCanvasDesign, friendlyName, databaseFriendlyName }: CloseTemplateButtonProps) {
    const { canvasDesign, setSelectedId } = useCanvasDesignContext();
    const navigate = useNavigate();
    const handleClose = async () => {
        if (isTemplateChanged(dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName)) {
            const result = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (!result) {
                return;
            }
        }
        setSelectedId(null);
        navigate("/templates");
    }
    return (

        <Button
            type="primary"
            size = "large"
            onClick={handleClose}
        >
            Close
        </Button>

    );
}