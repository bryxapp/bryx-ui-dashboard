import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../../utils/time-util';
import Typography from '@mui/material/Typography';

const TemplatesListItem = ({ template, handleTemplateDelete }: any) => {
    const displayDate = convertEpochTime(template._ts);

    return (
        <ListItem
            secondaryAction={
                <div>
                    <a href={'/edit-template?templateId=' + template.id}>
                        <IconButton aria-label="edit" >
                            <EditIcon />
                        </IconButton>
                    </a>
                    <IconButton aria-label="delete" onClick={() => handleTemplateDelete(template.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <DescriptionIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {template.friendlyName}
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

export default TemplatesListItem;