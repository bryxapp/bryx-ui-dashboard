import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth0UserContext } from '../contexts/Auth0UserContext';

export const useAuth0User = () => {
  const { user: auth0User, getAccessTokenSilently, isLoading, loginWithRedirect, logout } = useAuth0();
  const { token, expiry, setTokenAndExpiry } = useAuth0UserContext();

  const getAccessToken = useCallback(async () => {
    // Check if there's a valid token in the context and it's not expired
    const currentTime = new Date().getTime();
    if (token && expiry && currentTime < expiry) {
      return token;
    }

    // If there's no user return null
    if (!auth0User) return null;

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
  }, [token, expiry, auth0User?.sub]);

  // Return getAccessToken and user from the custom hook
  return { getAccessToken, auth0User, isLoading, loginWithRedirect, logout };
};