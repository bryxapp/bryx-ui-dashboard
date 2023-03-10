import { Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";


const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Typography variant="h4" component="h4" align="center">
            Please log in to continue
            <br />
            <br />
            <Button variant="contained" color="primary" sx={{ "fontSize": '1.2rem' }} onClick={() => loginWithRedirect()}>Log In</Button>
        </Typography>
    );
};

export default NotLoggedIn;