import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import logger from "../../logging/logger";
import AuthButton from "./AuthButton";

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0();
    const handleSignUp = async () => {
        logger.trackEvent({ name: 'SignUp', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect({
            authorizationParams: {
                screen_hint: 'signup'
            }
        });
    };

    const handleLogin = async () => {
        logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect();
    };

    return (
        <>
            <Typography variant="h4" component="h4" marginBottom={3}>
                Please Log In or Sign Up to Continue
            </Typography>
            <AuthButton onClick={handleLogin} text="Login" />
            <AuthButton onClick={handleSignUp} text="Sign Up" />
        </>
    );
};

export default NotLoggedIn;
