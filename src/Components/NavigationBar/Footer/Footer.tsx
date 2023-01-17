import Typography from '@mui/material/Typography';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            BRYX APP
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const Footer = () => {
    return (
        <div>
            <Copyright />
        </div>
    )
}

export default Footer
