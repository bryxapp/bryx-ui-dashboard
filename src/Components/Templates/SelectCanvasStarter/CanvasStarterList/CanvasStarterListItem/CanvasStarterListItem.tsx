import { Link, Paper, Typography, useTheme } from '@mui/material';
import { CanvasStarterData } from '../../../../../utils/types/CanvasInterfaces';
import { Feed } from '@mui/icons-material';

interface CanvasStarterListItemProps {
    canvasStarter: CanvasStarterData;
}

const CanvasStarterListItem = ({ canvasStarter }: CanvasStarterListItemProps) => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';

    return (
        <Link href={'/create-template?canvasStarterName=' + canvasStarter.name} underline="none">
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '14rem',
                    width: '14rem',
                    alignItems: 'center',
                }}
            >
                <Feed sx={{ fontSize: '8rem', color: 'gray' }} />
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '5rem',
                        width: '100%',
                        backgroundColor: 'gray',
                        p: '0.5rem',
                    }}
                >
                    <Typography
                        variant="h5"
                        color={textColor}
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            width: '100%',
                        }}
                    >
                        {canvasStarter.name}
                    </Typography>
                </Paper>
            </Paper>
        </Link>
    );
};

export default CanvasStarterListItem;
