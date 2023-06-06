import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import EstimateIcon from '@mui/icons-material/FeedOutlined';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';
import { useTheme } from '@mui/material';

interface Props {
  estimate: EstimateData;
}

const EstimateRecentPreview = ({ estimate }: Props) => {
  const displayDate = convertEpochTime(estimate._ts);
  const theme = useTheme();
  const paperColor = theme.palette.mode === 'dark' ? 'gray' : 'white';
  const barColor = theme.palette.mode === 'dark' ? 'white' : 'gray';
  const textColor = theme.palette.mode === 'dark' ? 'black' : 'white';

  return (
    <Link href={'/view-estimate?estimateId=' + estimate.id} underline="none">
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
        <EstimateIcon sx={{ fontSize: '8rem' }} />
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
              {estimate.estimateName}
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

export default EstimateRecentPreview;
