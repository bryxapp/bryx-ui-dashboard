import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { convertEpochTime } from '../../../../../utils/time-util';
import Typography from '@mui/material/Typography';
import { Paper, useTheme } from '@mui/material';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { useNavigate } from 'react-router-dom';

interface TemplateInfoBoxProps {
  template: TemplateData;
  showActions: boolean; // Optional prop to show or hide actions
  setOpen?: any;
}

const TemplateInfoBox: React.FC<TemplateInfoBoxProps> = ({ template, setOpen, showActions }) => {
  const displayDate = convertEpochTime(template._ts);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    if (setOpen) {
      setOpen(true);
    }
  };
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '.5rem', }}>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon htmlColor={theme.palette.text.secondary} />
          </IconButton>
          <IconButton onClick={handleEditClick}>
            <EditIcon htmlColor={theme.palette.text.secondary} />
          </IconButton>
        </div>
      )}
    </Paper>
  );
};

export default TemplateInfoBox;
