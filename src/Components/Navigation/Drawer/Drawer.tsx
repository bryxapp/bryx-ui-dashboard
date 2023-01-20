import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import MenuItems from "../MenuItems/MenuItems";
import { Typography } from '@mui/material';

interface DrawerProps {
    open: boolean;
    toggleDrawer: () => void;
    drawerWidth: number;
    theme: any;
}

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerWidth }: DrawerProps) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


const Drawer = ({ open, toggleDrawer, drawerWidth, theme }: DrawerProps) => {
    return (
        <StyledDrawer variant="permanent" open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} theme={theme}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Typography variant="h6" noWrap component="div">
                    Menu
                </Typography>

                <div style={{ flexGrow: 1 }}></div>
                <IconButton onClick={toggleDrawer}>

                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {MenuItems}
            </List>
        </StyledDrawer>
    )
}

export default Drawer;