import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../../../Utils/time-util';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const EstimateListItem = ({ estimate, handleEstimateDelete }: any) => {
    const displayDate = convertEpochTime(estimate._ts);
    const [open, setOpen] = useState(false);

    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        handleEstimateDelete(estimate.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <ListItem
            secondaryAction={
                <div>
                    <a href={'/view-estimate?estimateId=' + estimate.id}>
                        <IconButton aria-label="view" >
                            <ViewIcon />
                        </IconButton>
                    </a>
                    <IconButton aria-label="delete" onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        >
            <a href={'/view-estimate?estimateId=' + estimate.id}>
                <ListItemAvatar>
                    <Avatar>
                        <DescriptionIcon />
                    </Avatar>
                </ListItemAvatar>
            </a>
            <ListItemText
                primary={
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {estimate.estimateName}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
                        {displayDate}
                    </Typography>}
            />

            <Dialog open={open} onClose={handleCancelDelete}>
                <DialogTitle>Delete Estimate</DialogTitle>
                <Typography variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
                    Are you sure you want to permanently delete this estimate?
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
