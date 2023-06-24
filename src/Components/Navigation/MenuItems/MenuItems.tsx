import React from 'react';
import FeedOutlined from '@mui/icons-material/FeedOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import MenuItem from './MenuItem.tsx/MenuItem';

const MenuItems = (
    <React.Fragment>
        {MenuItem('Estimates', '/estimates', <FeedOutlined />)}
        {MenuItem('Templates', '/templates', <LayersIcon />)}
    </React.Fragment>
);

export default MenuItems;