import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { convertEpochTime } from '../../../../utils/time-util';
import Typography from '@mui/material/Typography';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { Paper, useTheme } from '@mui/material';

interface TemplateInfoBoxProps {
  template: TemplateData;
  setOpen: any;
}

const TemplateInfoBox: React.FC<TemplateInfoBoxProps> = ({ template, setOpen }) => {
  const displayDate = convertEpochTime(template._ts);
  const theme = useTheme();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  return (
    <Paper
      sx={{
        height: '6rem',
        width: '100%',
        background: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
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
        <Typography variant="body2" color={theme.palette.text.secondary} gutterBottom>
          {displayDate}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '.5rem', }}>
        <IconButton onClick={handleDeleteClick}>
          <DeleteIcon htmlColor={theme.palette.text.secondary} />
        </IconButton>
        <IconButton href={`/edit-template?templateId=${template.id}`}>
          <EditIcon htmlColor={theme.palette.text.secondary} />
        </IconButton>
      </div>
    </Paper>
  );
};

export default TemplateInfoBox;
