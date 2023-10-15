import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAccessTokenContext } from '../contexts/AccessTokenContext';

export const useAccessToken = () => {
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  const { token, expiry, setTokenAndExpiry } = useAccessTokenContext();

  const getAccessToken = useCallback(async () => {
    // Check if there's a valid token in the context and it's not expired
    const currentTime = new Date().getTime();
    if (token && expiry && currentTime < expiry) {
      return token;
    }

    // If there's no user return null
    if (!user) return null;

    // Fetch a new token using Auth0
    const newToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "read:current_user update:current_user_metadata",
      }
    });

    const newExpiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds

    // Store the new token and its expiry in the context
    setTokenAndExpiry(newToken, newExpiry);

    return newToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, expiry, user?.sub]);

  // Return getAccessToken and user from the custom hook
  return { getAccessToken, user, isLoading };
};