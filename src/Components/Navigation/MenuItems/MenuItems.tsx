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

    return (
        <Menu selectedKeys={getSelectedKeys()}
            theme='dark'>
            <Menu.Item
                key="/"
                icon={<FileTextOutlined style={{ fontSize: '24px' }} />}
                style={{ fontSize: '24px', marginTop: '15px' }}
            >
                <Link to="/">Estimates</Link>
            </Menu.Item>
            <Menu.Item key="/templates" icon={<FaPencilRuler style={{ fontSize: '24px' }} />} style={{ fontSize: '24px', marginTop: '15px' }}>
                <Link to="/templates">Templates</Link>
            </Menu.Item>
            {isAdmin && (
                <Menu.Item key="/admin" icon={<UserOutlined style={{ fontSize: '24px' }} />} style={{ fontSize: '24px', marginTop: '15px' }}>
                    <Link to="/admin">Admin</Link>
                </Menu.Item>
            )}
        </Menu>
    );
};

export default MenuItems;
