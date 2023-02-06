import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const TemplatesListItem = ({ template, handleTemplateDelete }: any) => {
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
                primary={template.friendlyName}
            />
        </ListItem>
    );
};

export default TemplatesListItem;