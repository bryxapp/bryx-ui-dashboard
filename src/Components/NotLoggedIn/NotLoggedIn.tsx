import { Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Typography variant="h4" component="h4" marginBottom={3}>
                Please Log In or Sign Up to Continue
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.2rem', marginRight: '1rem' }}
                onClick={() => loginWithRedirect()}
            >
                Log In/Sign Up
            </Button>
        </>
    );
};

export default NotLoggedIn;
