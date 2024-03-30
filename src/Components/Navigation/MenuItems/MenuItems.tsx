import { Menu } from 'antd';
import {
    ReadOutlined,
    AppstoreOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

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
            <Menu.Item key="/" icon={<ReadOutlined />}>
                <Link to="/">Estimates</Link>
            </Menu.Item>
            <Menu.Item key="/templates" icon={<AppstoreOutlined />}>
                <Link to="/templates">Templates</Link>
            </Menu.Item>
            {isAdmin && (
                <Menu.Item key="/admin" icon={<UserOutlined />}>
                    <Link to="/admin">Admin</Link>
                </Menu.Item>
            )}
        </Menu>
    );
};

export default MenuItems;
