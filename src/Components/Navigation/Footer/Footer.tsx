import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            BRYX
            {' '}
            {new Date().getFullYear()}
        </Typography>
    )
}
export default Footer
