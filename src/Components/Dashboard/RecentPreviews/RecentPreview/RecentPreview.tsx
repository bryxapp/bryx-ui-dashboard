import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import EstimateIcon from '@mui/icons-material/FeedOutlined';
import TemplateIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';

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
            background: 'gray',
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
              color="white"
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
            <Typography variant="body2" color="white" gutterBottom>
              {displayDate}
            </Typography>
          </div>
        </Paper>
      </Paper>
    </Link>
  );
};

export default RecentPreview;
