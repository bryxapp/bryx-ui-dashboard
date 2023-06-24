import FeedOutlined from '@mui/icons-material/FeedOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import MenuItem from './MenuItem.tsx/MenuItem';
import List from '@mui/material/List';


const MenuItems = () => (
    <List component="nav" sx={{ alignItems: 'center' }}>
        {MenuItem('Estimates', '/', <FeedOutlined />)}
        {MenuItem('Templates', '/templates', <LayersIcon />)}
    </List>
);

export default MenuItems;