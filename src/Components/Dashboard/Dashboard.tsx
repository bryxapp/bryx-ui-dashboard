import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getRecentTemplates } from '../../utils/templates-api';
import RecentPreviews from './RecentPreviews/RecentPreviews';
import Loading from '../SharedComponents/Loading/Loading';
import { getRecentEstimates } from '../../utils/estimates-api';


const Dashboard = () => {
    //Get 5 most recent templates
    const [templates, setTemplates] = useState([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [estimates, setEstimates] = useState([]);
    const [estimatesLoading, setEstimatesLoading] = useState(true);

    useEffect(() => {
        getRecentTemplates(4).then((response: any) => {
            setTemplates(response.data);
            setTemplatesLoading(false);
        });
        getRecentEstimates(4).then((response: any) => {
            setEstimates(response.data);
            setEstimatesLoading(false);
        });
    }, []);

    return (
        <Grid container spacing={3}>
            <Typography variant="h3" color="dark">
                Dashboard
            </Typography>
            {/* Recent Estimates */}
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
                    {!estimatesLoading && <RecentPreviews objects={estimates} url={'/view-estimate?estimateId'} />}
                </Paper>
            </Grid>
            {/* Recent Templates */}
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
                    {!templatesLoading &&
                        <RecentPreviews objects={templates} url={'/edit-template?templateId'} />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;