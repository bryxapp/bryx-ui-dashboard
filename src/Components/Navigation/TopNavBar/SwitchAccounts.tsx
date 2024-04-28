import { useEffect, useState } from 'react';
import { Button, Popover, } from 'antd';
import { getOrganizationsForUser } from '../../../utils/api/user-api';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { Auth0Organization } from '../../../utils/types/OrganizationInterfaces';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { SwapOutlined } from '@ant-design/icons';

const SwitchAccounts = () => {
    const { getAccessToken } = useAuth0User();
    const [organizations, setOrganizations] = useState<Auth0Organization[]>();
    const { loginWithRedirect, logout } = useAuth0();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const location = useLocation();

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

    useEffect(() => {
        if (location.pathname === "/team-checkout" && location.search.includes("?success=true")) {
            setPopoverOpen(true);
        }
        else {
            setPopoverOpen(false);
        }
    }, [location.search, location.pathname]);

    if (!organizations || organizations.length === 0) return null;

    return (
        <>
        <div>
            <Button
                onClick={handleLoginToNewOrg}
                icon={<SwapOutlined />}
                type="primary"
                size="large"
                style={{ marginLeft: 12 }}
            >
                Change Team
            </Button>
            </div>
            <Popover
                open={popoverOpen}
                placement="bottom"
                content={
                    "Use this button to switch between your teams."}
            />
        </>
    );
}

export default SwitchAccounts;
