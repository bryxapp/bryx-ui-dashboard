import { useEffect, useState } from 'react';
import { Button, } from 'antd';
import { getOrganizationsForUser } from '../../../utils/api/user-api';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { Auth0Organization } from '../../../utils/types/OrganizationInterfaces';
import { useAuth0 } from '@auth0/auth0-react';

const SwitchAccounts = () => {
    const { getAccessToken } = useAuth0User();
    const [organizations, setOrganizations] = useState<Auth0Organization[]>();
    const { loginWithRedirect, logout } = useAuth0();

    const handleLoginToNewOrg = async () => {
        await logout();
        await loginWithRedirect();
    }

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const token = await getAccessToken();
                if (!token) return;  // Exit if there's no token
                const retrievedOrganizations = await getOrganizationsForUser(token);
                setOrganizations(retrievedOrganizations || []); // Use response or empty array to prevent errors
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
                setOrganizations([]); // Reset or handle errors appropriately
            }
        };

        fetchOrganizations();

        // Optionally, return a cleanup function to reset state when component unmounts
        return () => setOrganizations([]);
    }, [getAccessToken]); // Added dependency to re-fetch when getAccessToken changes

    if (!organizations || organizations.length === 0) return null;

    return (
        <Button type="primary" onClick={handleLoginToNewOrg}>
            Change Team
        </Button>
    );
}

export default SwitchAccounts;
