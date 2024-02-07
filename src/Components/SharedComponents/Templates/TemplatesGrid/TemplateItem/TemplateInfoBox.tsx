import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { convertEpochTime } from '../../../../../utils/time-util';
import Typography from '@mui/material/Typography';
import { Paper, useTheme } from '@mui/material';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { useNavigate } from 'react-router-dom';

interface TemplateInfoBoxProps {
  template: TemplateData;
  showActions: boolean; // Optional prop to show or hide actions
  setOpenDelete?: any;
  setOpenCopy?: any;
}

const TemplateInfoBox: React.FC<TemplateInfoBoxProps> = ({ template, setOpenDelete, setOpenCopy, showActions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const displayDate = convertEpochTime(template._ts);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    if (setOpenDelete) {
      setOpenDelete(true);
    }
  };

  const handleCopyClick = () => {
    if (setOpenCopy) {
      setOpenCopy(true);
    }
  }

  const handleEditClick = () => {
    navigate(`/edit-template?templateId=${template.id}`)
  }

  return (
    <Paper
      sx={{
        height: '5rem',
        width: '100%',
        background: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '1rem' }}>
        <Typography
          variant="body1"
          color={theme.palette.text.secondary}
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {template.friendlyName}
        </Typography>
        {showActions && (
          <Typography variant="body2" color={theme.palette.text.secondary} gutterBottom>
            {displayDate}
          </Typography>
        )}
      </div>
      {showActions && (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon htmlColor={theme.palette.text.secondary} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
          >
            <MenuItem onClick={handleEditClick}>
              <EditIcon htmlColor={theme.palette.text.primary} /> Edit
            </MenuItem>
            <MenuItem onClick={handleCopyClick}>
              <CopyIcon htmlColor={theme.palette.text.primary} /> Copy
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
              <DeleteIcon htmlColor={theme.palette.text.primary} /> Delete
            </MenuItem>
          </Menu>
        </div>
      )}
    </Paper>
  );
};

export default TemplateInfoBox;
