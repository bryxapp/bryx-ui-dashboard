import { convertEpochTime } from '../../../../utils/time-util';
import { Link, Paper, Typography } from '@mui/material';
import EstimateIcon from '@mui/icons-material/FeedOutlined';
import TemplateIcon from '@mui/icons-material/InsertDriveFileOutlined';

interface Props {
    object: any;
    url: string;
}

const RecentPreview = ({ object, url }: Props) => {
    const displayDate = convertEpochTime(object._ts);
    const title = object.friendlyName ? object.friendlyName : object.estimateName;
    const isTemplate = url.includes('template');

    return (
        <Link href={url + '=' + object.id} underline='none'>
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
                        <Typography variant='body1' color={'white'} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant='body2' color={'white'} gutterBottom>
                            {displayDate}
                        </Typography>
                    </div>
                </Paper>
            </Paper>
        </Link>
    );
};

export default RecentPreview;
