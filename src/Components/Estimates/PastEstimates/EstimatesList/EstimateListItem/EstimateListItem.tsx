import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../../../utils/time-util';
import Typography from '@mui/material/Typography';

const EstimateListItem = ({ estimate, handleEstimateDelete }: any) => {
    const displayDate = convertEpochTime(estimate._ts);
    
    return (
        <ListItem
            secondaryAction={
                <div>
                    <a href={'/view-estimate?estimateId=' + estimate.id}>
                        <IconButton aria-label="view" >
                            <ViewIcon />
                        </IconButton>
                    </a>
                    <IconButton aria-label="delete" onClick={() => handleEstimateDelete(estimate.id)}>
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
        </ListItem>
    );
};

export default EstimateListItem;