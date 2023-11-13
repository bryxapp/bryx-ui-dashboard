import { Typography, Box, Paper } from "@mui/material";
import logger from "../../../logging/logger";
import AuthButton from "./AuthButton";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import LoginIcon from '@mui/icons-material/Login'; // Example icons
import SignUpIcon from '@mui/icons-material/HowToReg';

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0User();

    const handleSignUp = async () => {
        logger.trackEvent({ name: 'SignUp', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
    };

    const handleLogin = async () => {
        logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect();
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} style={{ padding: 20, width: 'auto', maxWidth: 600, margin: '0 auto' }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Please Log In or Sign Up to Continue
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <AuthButton startIcon={<LoginIcon />} onClick={handleLogin} text="Login" color='primary' fontSize={1.5}/>
                    <AuthButton startIcon={<SignUpIcon />} onClick={handleSignUp} text="Sign Up" color='primary' fontSize={1.5}/>
                </Box>
            </Paper>
        </Box>
    );
};

export default NotLoggedIn;