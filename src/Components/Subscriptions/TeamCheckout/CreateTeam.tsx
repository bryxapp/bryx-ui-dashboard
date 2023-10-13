import { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { teamSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { createCheckoutSession } from '../../../utils/api/checkout-api';
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = process.env.REACT_APP_STRIPE_KEY ? loadStripe(process.env.REACT_APP_STRIPE_KEY) : null;

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const { user } = useAccessToken();

  const handleTeamNameChange = (event:any) => {
    setTeamName(event.target.value);
  };

  const handleCheckout = async () => {
    try {
        if (teamName.trim() === '') {
            // Display an error message or prevent checkout
            alert('Please enter a valid team name.');
          } else {

        if (!user?.sub) {
            throw new Error("User not found");
        }

        const stripe = await stripePromise;
        if (!stripe) {
            throw new Error("Stripe is not initialized.");
        }

        const session = await createCheckoutSession(teamSubscription.stripeId);
        if (!session) {
            throw new Error("Session creation failed.");
        }
        //redirect to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            throw new Error("Error redirecting to checkout.");
        }
    }
    } catch (error) {
        console.error("An error occurred during the checkout process:", error);
    }
};

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
            Upgrading to {teamSubscription.name} Plan
        </Typography>
        <Typography variant="h4" gutterBottom>
          Create Your Team
        </Typography>
        <Typography variant="body1" paragraph>
          Fill in the team name and proceed to create a team organization for collaboration.
        </Typography>
        <TextField
          label="Team Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={teamName}
          onChange={handleTeamNameChange}
        />
        <Typography variant="body2" paragraph>
          - This action creates a separate organization for team members to collaborate.
        </Typography>
        <Typography variant="body2" paragraph>
          - After checkout, you'll need to log out and log in to access your new team.
        </Typography>
        <Typography variant="body2" paragraph>
          - You can change the team name later.
        </Typography>
        <Typography variant="body2" paragraph>
          - You will be able to add and remove team members.
        </Typography>
        <Typography variant="body2" paragraph>
          - This action does not impact your personal STARTER or PRO subscription; it is managed separately.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTeam;
