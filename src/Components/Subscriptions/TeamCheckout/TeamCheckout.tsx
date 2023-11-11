import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeam } from '../../../utils/api/checkout-api';
import AuthButton from '../../SharedComponents/NotLoggedIn/AuthButton';
import { LogoutOptions } from '@auth0/auth0-react';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TeamCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading, logout } = useAuth0User();
    const [error, setError] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (!requestSent && query.get("success")) {
                try {
                    if (isLoading || !auth0User) return;
                    const sessionId = query.get("session_id");
                    if (!sessionId || !auth0User?.sub) {
                        throw new Error("Error retrieving session id or user id");
                    }
                    await createTeam(sessionId, auth0User.sub);
                    setError(false);
                    setRequestSent(true);
                } catch (error) {
                    console.error("An error occurred during the checkout success process:", error);
                    setError(true);
                    logger.trackException({
                        properties: {
                            name: "Checkout Success Error",
                            page: "Checkout",
                            description: "Error creating team",
                            error: error,
                        },
                    });
                }
            } else if (query.get("canceled")) {
                setError(true);
                logger.trackException({
                    properties: {
                        name: "Checkout Canceled Error",
                        page: "Checkout",
                        description: "User canceled checkout",
                    },
                });
                console.error("Checkout canceled");
            }
        };

        // Fetch data on component mount
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, isLoading]);

    const handleLogout = () => {
        logout({ returnTo: 'dashboard.bryxbids.com' } as LogoutOptions);
    };

    if (error) return <ErrorMessage dataName='checkout' />;

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" color="primary" gutterBottom>
                    Order Complete
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    You have successfully created your new team!
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.primary">
                        You will need to log out and then log back in to access your new team.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <AuthButton onClick={handleLogout} text='Log Out' />
                </Stack>
            </Paper>
        </Container>
    );
};

export default TeamCheckout;
