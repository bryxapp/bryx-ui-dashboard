import { Typography } from "@mui/material";
import logger from "../../logging/logger";
import AuthButton from "./AuthButton";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0User();
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
