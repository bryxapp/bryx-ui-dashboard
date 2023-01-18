import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';

const Dashboard = () => {
    return (
        <Box
        component="main"
        sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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
        </Container>
    </Box>
    );
};

export default Dashboard;