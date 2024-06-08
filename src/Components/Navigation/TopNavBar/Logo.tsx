import { Avatar, Typography } from 'antd';
import logoSvg from "../../../bryx_logo.svg"
import { useBrandingContext } from '../../../utils/contexts/BrandingContext';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';
const Logo = () => {
    const { branding, displayName } = useBrandingContext();
    const { organization } = useOrganizationContext();

    let logo = logoSvg;
    if (branding?.logoUrl) {
        console.log('branding', branding)
        logo = branding.logoUrl;
    }
    else if (organization?.bryxOrg?.branding?.logoUrl) {
        logo = organization?.bryxOrg?.branding?.logoUrl
    }

    return (
            <div style={{ display: "flex" }}>
                <Avatar shape='square' src={logo} size="large" />
                <Typography.Title
                    level={2}
                    style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        margin: 0,
                        paddingLeft: '10px',
                    }}
                >
                    {displayName}
                </Typography.Title>
            </div>
    );
};

export default Logo;