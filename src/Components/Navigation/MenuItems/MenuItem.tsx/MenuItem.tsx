
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';


const MenuItem = (title: string, hrefValue: string, icon: any) => {
    return (
        <Link href={hrefValue} underline='none' noWrap>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {title}
                </Typography>} />
            </ListItemButton>
        </Link>
    )
}

export default MenuItem;


