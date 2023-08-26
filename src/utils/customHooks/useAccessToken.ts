import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAccessToken = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const getAccessToken = useCallback(async () => {
    if (!user) return null;
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "read:current_user update:current_user_metadata",
      }
    });
  }, [user, getAccessTokenSilently]);

  return { getAccessToken };
};
