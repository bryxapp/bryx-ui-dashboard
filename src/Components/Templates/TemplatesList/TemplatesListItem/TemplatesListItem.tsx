import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


const TemplatesListItem = ({ template }: any) => {

    return (
        <ListItem
            secondaryAction={
                <div>
                    <IconButton aria-label="delete">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
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
                primary={template.name}
            />
        </ListItem>
    );
};

export default TemplatesListItem;