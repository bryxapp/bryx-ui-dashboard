import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Typography variant="h3" color="dark">
                Dashboard
            </Typography>
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
                </Paper>
            </Grid>
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
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;