import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getRecentTemplates } from '../../utils/templates-api';
import RecentPreviews from './RecentPreviews/RecentPreviews';
import Loading from '../SharedComponents/Loading/Loading';


const Dashboard = () => {
    //Get 5 most recent templates
    const [templates, setTemplates] = useState([]);
    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecentTemplates(4).then((response: any) => {
            setTemplates(response.data);
            setLoading(false);
        });
        //TODO Query for estimates
        setEstimates([]);
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
                    {loading && <Loading />}
                    {!loading && <RecentPreviews objects={estimates} url={'/past-estimate?estiamteId'} />}
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
                    {loading && <Loading />}
                    {!loading &&
                        <RecentPreviews objects={templates} url={'/edit-template?templateId'} />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;