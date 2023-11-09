import { Typography, useTheme } from '@mui/material';
import Link from '../../SharedComponents/Link/Link';
const Logo = () => {
    const theme = useTheme();
    
    const handleLogoClick = () => {
        window.location.href = 'https://www.bryxbids.com/'; // Navigate to Home Site
    };
    
    return (
        <Link to="/" onClick={handleLogoClick}>
            <Typography 
                variant="h2" 
                color={theme.palette.text.secondary} 
                noWrap
                sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                        fontSize: '1rem',
                    },
                }}
            >
                BRYX bids
            </Typography>
        </Link>
    );
};

export default Logo;
