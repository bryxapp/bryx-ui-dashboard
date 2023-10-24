import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Logo = () => {
    const theme = useTheme();
    
    const handleLogoClick = () => {
        window.location.href = 'https://www.bryxbids.com/'; // Navigate to Home Site
    };
    
    return (
        <Link to="/" onClick={handleLogoClick}> {/* Use Link from react-router-dom */}
            <Typography 
                variant="h1" 
                color={theme.palette.text.secondary} 
                noWrap
                sx={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                        fontSize: '2rem',
                    },
                }}
            >
                BRYX bids
            </Typography>
        </Link>
    );
};

export default Logo;
