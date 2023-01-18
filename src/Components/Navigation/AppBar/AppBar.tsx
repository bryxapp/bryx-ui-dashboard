
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

interface AppBarProps {
    open: boolean;
    toggleDrawer: () => void;
    drawerWidth: number;
    theme: any;
}

const StyledAppBar = styled(MuiAppBar)(({ theme, open, drawerWidth }: AppBarProps) => ({
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));




const AppBar = ({ open, toggleDrawer, drawerWidth, theme }: AppBarProps) => (
    <StyledAppBar open={open} toggleDrawer ={toggleDrawer} drawerWidth={drawerWidth} theme = {theme}>
        <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                bryx Dashboard
            </Typography>
        </Toolbar>
    </StyledAppBar>
);

export default AppBar;