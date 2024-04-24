import { Avatar, Typography } from 'antd';
import { Link } from "react-router-dom"; // Correct import statement
import logoSvg from "../../../bryx_logo.svg"
const Logo = () => {
    
    const handleLogoClick = (event : any) => {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'https://www.bryxbids.com/'; // Navigate to Home Site
    };
    
    return (
        <Link to="/" onClick={handleLogoClick}>
            <div style={{display:"flex"}}> 
            <Avatar shape='square' src={logoSvg} size="large" />
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
                BRYX bids
            </Typography.Title>
            </div>
        </Link>
    );
};

export default Logo;