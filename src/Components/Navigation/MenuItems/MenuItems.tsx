import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import MenuItem from './MenuItem.tsx/MenuItem';

const MenuItems = (
    <React.Fragment>
        {MenuItem('Dashboard', '/', <DashboardIcon />)}
        {MenuItem('Templates', '/templates', <BarChartIcon />)}
        {MenuItem('Estimates', '/estimates', <LayersIcon />)}
    </React.Fragment>
);

export default MenuItems;