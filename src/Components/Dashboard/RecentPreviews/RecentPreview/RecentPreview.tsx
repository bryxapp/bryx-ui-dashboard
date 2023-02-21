import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import EstimateIcon from '@mui/icons-material/FeedOutlined';
import TemplateIcon from '@mui/icons-material/InsertDriveFileOutlined';



const RecentPreview = ({ object, url }: any) => {
    const displayDate = convertEpochTime(object._ts);
    const title = object.friendlyName ? object.friendlyName : object.estimateName;
    const isTemplate = url.includes('template');
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
                {isTemplate && <TemplateIcon sx={{ fontSize: 8 + 'rem' }} />}
                {!isTemplate && <EstimateIcon sx={{ fontSize: 8 + 'rem' }} />}
                <Paper sx={{ height: 5 + 'rem', width: 100 + '%', background: "gray", justifyContent: 'flex-end', }}>
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
