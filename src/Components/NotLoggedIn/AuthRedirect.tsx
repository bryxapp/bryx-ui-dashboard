// AuthRedirect.js
import { useEffect } from 'react';

const AuthRedirect = () => {
  useEffect(() => {
    window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize`;
  }, []);

  return null;
};

export default AuthRedirect;
