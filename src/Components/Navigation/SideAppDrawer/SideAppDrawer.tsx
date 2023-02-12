import List from '@mui/material/List';
import MenuItems from "../MenuItems/MenuItems";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const SideAppDrawer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#e5e5e5',
                minHeight: '90%',
                padding: '1rem',
            }}
        >
            <Toolbar />
            <List component="nav" sx={{ alignItems: 'center', width: '10%' }}>
                {MenuItems}
            </List>
            <Link href='/select-template'>
                <Button variant="contained" color="primary" sx={{ margin: 2, width: '85%' }}>
                    + New Estimate
                </Button>
            </Link>
        </Box>
    )
}

export default SideAppDrawer;
