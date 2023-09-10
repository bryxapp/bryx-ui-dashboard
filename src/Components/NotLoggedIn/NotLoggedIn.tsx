import { Typography, Button, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh" // This will center content vertically on the viewport
        >
            <Typography variant="h4" component="h4" marginBottom={3}>
                Please log in to continue
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.2rem', marginRight: '1rem' }}
                onClick={() => loginWithRedirect()}
            >
                Log In/Sign Up
            </Button>
        </Box >
    );
};

export default NotLoggedIn;
