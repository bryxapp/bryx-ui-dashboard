import { useCallback, useRef } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import isEqual from 'lodash/isEqual';

export const useAccessToken = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  // Store the previous user value with the type `User | undefined`
  const prevUserRef = useRef<User | undefined>();

  // Check if the user has deep-changed
  const hasUserChanged = !isEqual(user, prevUserRef.current);

  // Update the ref to the current user value after checking
  prevUserRef.current = user;

  const getAccessToken = useCallback(async () => {
    if (!user || !hasUserChanged) return null;

    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "read:current_user update:current_user_metadata",
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUserChanged, getAccessTokenSilently]);

  return { getAccessToken };
};