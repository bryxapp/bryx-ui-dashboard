import FeedOutlined from '@mui/icons-material/FeedOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import MenuItem from './MenuItem.tsx/MenuItem'; // Ensure path is correct
import List from '@mui/material/List';

const MenuItems = () => (
    <List component="nav" sx={{ alignItems: 'center' }}>
        <MenuItem title="Estimates" link="/" icon={<FeedOutlined />} />
        <MenuItem title="Templates" link="/templates" icon={<LayersIcon />} />
    </List>
);

export default MenuItems;
