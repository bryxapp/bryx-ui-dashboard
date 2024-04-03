import { Typography } from 'antd';
import { Link } from "react-router-dom"; // Correct import statement
const Logo = () => {
    
    const handleLogoClick = (event : any) => {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'https://www.bryxbids.com/'; // Navigate to Home Site
    };
    
    return (
        <Link to="/" onClick={handleLogoClick}>
            <Typography.Title
                level={2}
                style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                }}
            >
                BRYX bids
            </Typography.Title>
        </Link>
    );
};

export default Logo;