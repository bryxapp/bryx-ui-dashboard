import { useAuth0 } from '@auth0/auth0-react';

export const useAccessToken = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";

  const getAccessToken = async () => {
    if (!userId) return null;
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "read:current_user update:current_user_metadata",
      }
    });
  };

  return { userId, getAccessToken };
};
