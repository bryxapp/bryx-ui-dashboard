import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import Feed from '@mui/icons-material/FeedOutlined';



const RecentPreview = ({ object, url }: any) => {
    const displayDate = convertEpochTime(object._ts);
    const title = object.friendlyName;
    const objectColor = url.includes('template') ? 'gray' : 'black';
    return (
        <Link href={url + '=' + object.id} underline='none'>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 12 + 'rem',
                    width: 14 + 'rem',
                    alignItems: 'center',
                }}
            >
                <Feed sx={{ fontSize: 8 + 'rem', color: objectColor }} />
                <Paper sx={{ height: 5 + 'rem', width: 100 + '%', background: objectColor, justifyContent: 'flex-end', }}>
                    <div style={{
                        padding: .5 + 'rem',
                    }}>
                        <Typography variant="h5" color={'white'} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body1" color={'white'} gutterBottom>
                            {displayDate}
                        </Typography>
                    </div>
                </Paper>
            </Paper>
        </Link>
    );
};

export default RecentPreview;
