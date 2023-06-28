import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import { EstimateDraftData } from '../../../utils/types/EstimateInterfaces';

interface EstimatesActionPanelProps {
    estimate: EstimateData | EstimateDraftData;
    setOpen: (open: boolean) => void;
    editLink: string;
}

const EstimatesActionPanel = ({ estimate, setOpen, editLink }: EstimatesActionPanelProps) => {

    const handleDeleteClick = () => {
        setOpen(true);
    };

    return (
        <div>
            <a href={editLink}>
                <IconButton aria-label="view">
                    <ViewIcon />
                </IconButton>
            </a>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default EstimatesActionPanel;
