import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getRecentTemplates } from '../../utils/templates-api';
import RecentPreviews from './RecentPreviews/RecentPreviews';
import Loading from '../SharedComponents/Loading/Loading';
import { getRecentEstimates } from '../../utils/estimates-api';
import useTheme from '@mui/material/styles/useTheme';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
    const [templates, setTemplates] = useState([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [estimates, setEstimates] = useState([]);
    const [estimatesLoading, setEstimatesLoading] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email ? user.email : '';
    const theme = useTheme();

    useEffect(() => {
        if (!userId) return;
        getRecentTemplates(4, userId).then((response) => {
            setTemplates(response.data);
            setTemplatesLoading(false);
        });
        getRecentEstimates(4, userId).then((response) => {
            setEstimates(response.data);
            setEstimatesLoading(false);
        });
    }, [userId]);

    const isSmallScreen = window.innerWidth < 600;
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3" color = {textColor}>
                    Dashboard
                </Typography>
            </Grid>
            {/* Recent Estimates */}
            {isSmallScreen ? (
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Estimates
                        </Typography>
                        <a href="/past-estimates" style={{ textDecoration: 'none' }}>
                            <Typography variant="body1" color="primary">
                                View All Estimates
                            </Typography>
                        </a>
                    </Paper>
                </Grid>
            ) :
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 250,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Recent Estimates
                        </Typography>
                        {estimatesLoading && <Loading />}
                        {!estimatesLoading && (
                            <RecentPreviews objects={estimates} url={'/view-estimate?estimateId'} />
                        )}
                    </Paper>
                </Grid>
            }
            {/* Recent Templates */}
            {isSmallScreen ? (
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Templates
                        </Typography>
                        <a href="/templates" style={{ textDecoration: 'none' }}>
                            <Typography variant="body1" color="primary">
                                View All Templates
                            </Typography>
                        </a>
                    </Paper>
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 250,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Recent Templates
                        </Typography>
                        {templatesLoading && <Loading />}
                        {!templatesLoading && (
                            <RecentPreviews objects={templates} url={'/edit-template?templateId'} />
                        )}
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
};

export default Dashboard;
