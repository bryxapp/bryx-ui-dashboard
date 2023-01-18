
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

const MenuItem = (title: string, hrefValue: string, icon: any) => {
    return (
        <Link href={hrefValue} underline='none'>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </Link>
    )
}

export default MenuItem;


