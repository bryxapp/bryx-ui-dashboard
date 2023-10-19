// AuthRedirect.js
import { useEffect } from 'react';

const AuthRedirect = () => {
  useEffect(() => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    const scope = encodeURIComponent("read:current_user update:current_user_metadata openid profile email");

    window.location.href = `https://${domain}/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }, []);

  return null;
};

export default AuthRedirect;
