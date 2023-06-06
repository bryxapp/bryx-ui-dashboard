import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import PreviewStage from '../../../SharedComponents/PreviewStage/PreviewStage';
import { useTheme } from '@mui/material';

interface Props {
  template: TemplateData;
}

const TemplateRecentPreview = ({ template }: Props) => {
  const displayDate = convertEpochTime(template._ts);
  const theme = useTheme();
  const paperColor = theme.palette.mode === 'dark' ? 'gray' : 'white';
  const barColor = theme.palette.mode === 'dark' ? 'white' : 'gray';
  const textColor = theme.palette.mode === 'dark' ? 'black' : 'white';

  return (
    <Link href={'/edit-template?templateId=' + template.id} underline="none">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '12rem',
          width: '14rem',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          background: paperColor,
        }}
      >
        <div style={{ height: '1rem' }} />
        <PreviewStage canvasDesign={template.canvasDesign} scale={.20} />
        <Paper
          sx={{
            height: '7rem',
            width: '100%',
            background: barColor,
            justifyContent: 'flex-end',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <div
            style={{
              padding: '.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="body1"
              color={textColor}
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
            <Typography variant="body2" color={textColor} gutterBottom>
              {displayDate}
            </Typography>
          </div>
        </Paper>
      </Paper>
    </Link>
  );
};

export default TemplateRecentPreview;
