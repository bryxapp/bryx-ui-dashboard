import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../../../utils/time-util';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { EstimateDraftData } from '../../../../../utils/types/EstimateInterfaces';

interface EstimateDraftListItemProps {
    estimateDraft: EstimateDraftData;
    handleEstimateDraftDelete: (estimateDraftId: string) => void;
}

const EstimateListItem = ({ estimateDraft, handleEstimateDraftDelete }: EstimateDraftListItemProps) => {
    const displayDate = convertEpochTime(estimateDraft._ts);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';

    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        handleEstimateDraftDelete(estimateDraft.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <ListItem
            secondaryAction={
                <div>
                    <a href={'/form?templateId=' + estimateDraft.templateId + '&draftId=' + estimateDraft.id}>
                        <IconButton aria-label="view" >
                            <EditIcon />
                        </IconButton>
                    </a>
                    <IconButton aria-label="delete" onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        >
            <a href={'/form?templateId=' + estimateDraft.templateId}>
                <ListItemAvatar>
                    <Avatar>
                        <DescriptionIcon />
                    </Avatar>
                </ListItemAvatar>
            </a>
            <ListItemText
                primary={
                    <Typography color={textColor} variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {`[DRAFT]${estimateDraft.estimateName}`}
                    </Typography>
                }
                secondary={
                    <Typography color={textColor} variant="body2" component="div" sx={{ flexGrow: 1 }}>
                        {displayDate}
                    </Typography>}
            />

            <Dialog open={open} onClose={handleCancelDelete}>
                <DialogTitle>Delete Draft</DialogTitle>
                <Typography color={textColor} variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
                    Are you sure you want to permanently delete this estimate draft?
                </Typography>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};

export default EstimateListItem;
