import { Typography, useTheme } from '@mui/material';

const Logo = () => {
    const theme = useTheme();
    return (
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
    );
};

export default Logo;