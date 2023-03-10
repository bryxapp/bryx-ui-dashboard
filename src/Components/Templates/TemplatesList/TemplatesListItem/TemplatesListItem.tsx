import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { convertEpochTime } from '../../../../Utils/time-util';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const TemplatesListItem = ({ template, handleTemplateDelete }: any) => {
  const displayDate = convertEpochTime(template._ts);
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    handleTemplateDelete(template.id);
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
      secondaryAction={
        <div>
          <a href={'/edit-template?templateId=' + template.id}>
            <IconButton aria-label='edit'>
              <EditIcon />
            </IconButton>
          </a>
          <IconButton aria-label='delete' onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      }
    >
      <ListItemAvatar sx={{ alignSelf: 'center', mb: 1 }}>
        <Avatar>
          <DescriptionIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant='h5' component='div' sx={{ flexGrow: 1, maxWidth: '100%' }} noWrap>
            {template.friendlyName}
          </Typography>
        }
        secondary={
          <Typography variant='body2' component='div' sx={{ flexGrow: 1, maxWidth: '100%' }} noWrap>
            {displayDate}
          </Typography>
        }
      />

      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>Delete Template</DialogTitle>
        <Typography variant='body1' component='div' sx={{ flexGrow: 1, maxWidth: '100%' }} noWrap>
          Are you sure you want to permanently delete this template?
        </Typography>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default TemplatesListItem;
