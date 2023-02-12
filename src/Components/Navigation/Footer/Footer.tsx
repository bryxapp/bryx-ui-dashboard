import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const Footer = () => {
    return (
        <Box sx={{ minHeight: '10%', padding: '1.2rem' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                BRYX
                {' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}
export default Footer
