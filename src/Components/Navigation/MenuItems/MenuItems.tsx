import { Menu } from 'antd';
import {
    FileTextOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { FaPencilRuler } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface MenuItemsProps {
    isAdmin: boolean;
}

const MenuItems = ({ isAdmin }: MenuItemsProps) => {
    const location = useLocation();

    // Determine the current route to set the selected key
    const getSelectedKeys = () => {
        const paths = ["/", "/templates", "/admin"];
        return paths.filter(path => location.pathname === path);
    };

    // Define the menu items as an array of objects
    const menuItems = [
        {
            key: '/',
            icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
            label: (
                <Link to="/">Estimates</Link>
            ),
            style: { fontSize: '24px', marginTop: '15px' }
        },
        {
            key: '/templates',
            icon: <FaPencilRuler style={{ fontSize: '24px' }} />,
            label: (
                <Link to="/templates">Templates</Link>
            ),
            style: { fontSize: '24px', marginTop: '15px' }
        },
        ...(isAdmin ? [{
            key: '/admin',
            icon: <UserOutlined style={{ fontSize: '24px' }} />,
            label: (
                <Link to="/admin">Admin</Link>
            ),
            style: { fontSize: '24px', marginTop: '15px' }
        }] : [])
    ];

    return (
        <Menu selectedKeys={getSelectedKeys()} theme="dark" items={menuItems} />
    );
};

export default MenuItems;
