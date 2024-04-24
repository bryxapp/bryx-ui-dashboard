import React, { useState } from 'react';
import { Button, Card, Input, Typography, Spin, Row, Col, Layout } from 'antd';
import { teamSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeamCheckoutSession } from '../../../utils/api/checkout-api';
import { loadStripe } from '@stripe/stripe-js';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';

const { Title, Text } = Typography;
const { Content } = Layout;

const stripePromise = process.env.REACT_APP_STRIPE_KEY
  ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
  : null;

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth0User } = useAuth0User();
  const [error, setError] = useState(false);

  const handleTeamNameChange = (e: any) => {
    setTeamName(e.target.value);
    setTeamNameError('');
  };

  const handleCheckout = async () => {
    if (!teamName.trim()) {
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
      const session = await createTeamCheckoutSession(teamName, auth0User.email || "");
      if (!session) {
        throw new Error("Session creation failed.");
      }
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        throw result.error;
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
    <Layout>
      <Content>
        <Title level={2}>
          Upgrade to Team Plan
        </Title>
        <Title level={4}>
          Team Features
        </Title>
        <Row gutter={[16, 16]}>
          {teamSubscription.features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card>
                <Text>{feature}</Text>
              </Card>
            </Col>
          ))}
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text>Add and Remove Team Members</Text>
            </Card>
          </Col>
        </Row>
        <Title level={4}>
          Create Your Team
        </Title>
        <Card>
          <Title level={5}>Enter a name for your team and proceed to create an organization for collaboration.</Title>
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={handleTeamNameChange}
            style={teamNameError ? { borderColor: 'red' } : {}}
          />
          <Text>*You can change this later</Text>
          <br />
          {teamNameError && <Text type="danger">{teamNameError}</Text>}
          <Button type="primary" onClick={handleCheckout} disabled={loading} >
            {loading ? <Spin /> : "Proceed to Checkout"}
          </Button>
          <br />
          <br />
          <Text>
            NOTE: You are creating a separate organization for team members to collaborate. Your personal starter or pro subscription remains unaffected.
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default CreateTeam
