import { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { StyledTextField as TextField } from '../../SharedComponents/TextField/TextField';
import { teamSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeamCheckoutSession } from '../../../utils/api/checkout-api';
import { loadStripe } from "@stripe/stripe-js";
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';

const stripePromise = process.env.REACT_APP_STRIPE_KEY
  ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
  : null;

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth0User } = useAuth0User();
  const [error, setError] = useState<boolean>(false);

  const handleTeamNameChange = (event: any) => {
    setTeamName(event.target.value);
    setTeamNameError('');
  };

  const handleCheckout = async () => {
    if (teamName.trim() === '') {
      setTeamNameError('Please enter a valid team name.');
      return;
    }
    setLoading(true);
    try {
      if (!auth0User?.sub) {
        throw new Error("User not found");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe is not initialized.");
      }

      const email = auth0User?.email || "";
      const session = await createTeamCheckoutSession(teamName, email);
      if (!session) {
        throw new Error("Session creation failed.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error("Error redirecting to checkout.");
      }
    } catch (error) {
      logger.trackException({
        properties: {
          name: "Checkout Error",
          page: "Checkout",
          description: "Error creating checkout session",
          error: error,
        },
      });
      setError(true);
      console.error("An error occurred during the checkout process:", error);
    }
    setLoading(false);
  };

  if (error) return <ErrorMessage dataName="checkout" />;

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h2" color="primary.main">
          Upgrade to Team Plan
        </Typography>
        <Typography variant="h4" gutterBottom mt={4}>
          Team Features
        </Typography>
        <Grid container spacing={2}>
          {teamSubscription.features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1">
                    {feature}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="body1">
                  Easily add and remove team members
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4} />
        <Typography variant="h4" gutterBottom>
          Create Your Team
        </Typography>
        <Paper elevation={3} variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Enter a name for your team and proceed to create an organization for collaboration.
          </Typography>
          <Typography variant="body1" mb={1}>
            *You can change this later
          </Typography>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={teamName}
            onChange={handleTeamNameChange}
            error={Boolean(teamNameError)}
            helperText={teamNameError}
          />
          <Button variant="contained" color="primary" onClick={handleCheckout} disabled={loading}>
            {loading ? <CircularProgress color="secondary" size={20} /> : "Proceed to Checkout"}
          </Button>
        </Paper>
      </Box>
      <br />
      <Typography variant="body1">
        NOTE: You are creating a separate organization for team members to collaborate. Your personal starter or pro subscription remains unaffected.
      </Typography>
    </Container>
  );
};

export default CreateTeam;