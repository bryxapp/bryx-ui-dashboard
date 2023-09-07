import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { Box } from '@mui/system';

const Footer = () => {
    const theme = useTheme();
    return (
        <Box sx={{ minHeight: '10%', padding: '1.2rem', background:theme.palette.background.default }}>
            <Typography variant="body2" color={theme.palette.text.primary} align="center">
                {'Copyright © '}
                BRYX
                {' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}
export default Footer
