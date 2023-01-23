
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

const MenuItem = (title: string, hrefValue: string, icon: any) => {
    return (
        <Link href={hrefValue} underline='none'>
            <Tooltip title={title} arrow>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
            </Tooltip>
        </Link>
    )
}

export default MenuItem;


