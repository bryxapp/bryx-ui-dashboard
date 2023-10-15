import FeedOutlined from '@mui/icons-material/FeedOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuItem from './MenuItem.tsx/MenuItem'; // Ensure path is correct
import List from '@mui/material/List';

interface MenuItemsProps {
    isAdmin: boolean;
}
const MenuItems = ({isAdmin}:MenuItemsProps) => (
    <List component="nav" sx={{ alignItems: 'center' }}>
        <MenuItem title="Estimates" link="/" icon={<FeedOutlined />} />
        <MenuItem title="Templates" link="/templates" icon={<LayersIcon />} />
        {isAdmin && <MenuItem title="Admin" link="/admin" icon={<SupervisorAccountIcon />} />}
    </List>
);

export default MenuItems;
