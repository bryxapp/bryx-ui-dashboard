import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MenuItem = (title: string, hrefValue: string, icon: any) => {
    const location = useLocation();
    const selected = location.pathname === hrefValue;
    const theme = useTheme();

    const listItemButtonStyle = {
        backgroundColor: selected ? theme.palette.background.default : 'inherit', // Update the background color based on the selected prop
        color: theme.palette.text.primary,
    };


    return (
        <Link href={hrefValue} underline="none" noWrap>
            <ListItemButton sx={
                listItemButtonStyle
            }>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                            {title}
                        </Typography>
                    }
                />
            </ListItemButton>
        </Link>
    );
};

export default MenuItem;
