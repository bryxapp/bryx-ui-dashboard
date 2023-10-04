import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '../../../SharedComponents/Link/Link'
import { Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface MenuItemProps {
    title: string;
    link: string;
    icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, link, icon }) => {
    const location = useLocation();
    const selected = location.pathname === link;
    const theme = useTheme();

    const listItemButtonStyle = {
        backgroundColor: selected ? theme.palette.background.default : 'inherit',
        color: theme.palette.text.primary,
    };

    return (
        <Link to={link}>
            <ListItemButton sx={listItemButtonStyle}>
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