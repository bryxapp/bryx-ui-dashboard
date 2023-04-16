import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import EstimateIcon from '@mui/icons-material/FeedOutlined';
import TemplateIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';
import { useTheme } from '@mui/material';

interface Props {
  object: TemplateData | EstimateData;
  url: string;
}

const RecentPreview = ({ object, url }: Props) => {
  const displayDate = convertEpochTime(object._ts);
  const isTemplate = (object as TemplateData).friendlyName !== undefined;
  const title = isTemplate
    ? (object as TemplateData).friendlyName
    : (object as EstimateData).estimateName;
  const theme = useTheme();
  const paperColor = theme.palette.mode === 'dark' ? 'gray' : 'white';
  const barColor = theme.palette.mode === 'dark' ? 'white' : 'gray';
  const textColor = theme.palette.mode === 'dark' ? 'black' : 'white';

  return (
    <Link href={url + '=' + object.id} underline="none">
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
        {isTemplate ? (
          <TemplateIcon sx={{ fontSize: '8rem' }} />
        ) : (
          <EstimateIcon sx={{ fontSize: '8rem' }} />
        )}
        <Paper
          sx={{
            height: '5rem',
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
              {title}
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

export default RecentPreview;
