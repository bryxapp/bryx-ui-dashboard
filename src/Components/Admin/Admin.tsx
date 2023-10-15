import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import { getOrganization } from "../../utils/api/org-api";
import { useAccessToken } from "../../utils/customHooks/useAccessToken";

interface orgType {
    bryxOrg:{
        orgDisplayName: string;
    }
}

const Admin: React.FC = () => {
    const theme = useTheme();
    const [org, setOrg] = useState<orgType>();
    const { user, getAccessToken } = useAccessToken();

    useEffect(() => {
        async function fetchOrg() {
            if (org || !user) return;
            const token = await getAccessToken();
            if (!token) return;
            const fetchedOrg = await getOrganization(token);
            setOrg(fetchedOrg.data);
        }

        fetchOrg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.org_id]);

    return (
        <>
            <Typography variant="h3" color={theme.palette.text.primary}>
                Admin
            </Typography>
            <br />
            <Box sx={{ width: "100%", marginTop: 2 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    {org?.bryxOrg.orgDisplayName}
                </Typography>
            </Box>
        </>
    );
};

export default Admin;
