import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

const TopNavBar = () => (
    <AppBar>
        <Toolbar>
            <Typography
                component="h1"
                variant="h3"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                BRYX
            </Typography>
        </Toolbar>
    </AppBar>
);

export default TopNavBar;