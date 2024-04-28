import { Avatar, Typography } from 'antd';
import { Link } from "react-router-dom"; // Correct import statement
import logoSvg from "../../../bryx_logo.svg"
import { useBrandingContext } from '../../../utils/contexts/BrandingContext';
import { useEffect } from 'react';
const Logo = () => {
    const { branding, displayName } = useBrandingContext();

    let logo = logoSvg;
    if (branding?.logoUrl) {
        logo = branding.logoUrl;
    }

    const handleLogoClick = (event: any) => {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'https://www.bryxbids.com/'; // Navigate to Home Site
    };

    useEffect(() => {
        console.log(displayName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    , [displayName]);

    return (
        <Link to="/" onClick={handleLogoClick}>
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
        </Link>
    );
};

export default Logo;