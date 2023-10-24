import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invitation = searchParams.get('invitation');
  const organization = searchParams.get('organization');
  const organization_name = searchParams.get('organization_name');

  useEffect(() => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    const scope = encodeURIComponent("read:current_user update:current_user_metadata openid profile email");

    let url = `https://${domain}/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

    if (invitation) url += `&invitation=${invitation}`;
    if (organization) url += `&organization=${organization}`;
    if (organization_name) url += `&organization_name=${organization_name}`;

    window.location.href = url;
  }, [invitation, organization, organization_name]);

  return null;
};

export default AuthRedirect;
