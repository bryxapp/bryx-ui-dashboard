import React, { useState, useEffect } from 'react';
import MenuItems from '../MenuItems/MenuItems';
import { Drawer, Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';
import Sider from 'antd/es/layout/Sider';

const SideAppDrawer = () => {
    const { isOwner } = useOrganizationContext();
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Sider width="200">
            {isMobile ? (
                // Small Screens
                <>
                    <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
                    <Drawer
                        title="BRYX"
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        extra={
                            <Button type="text" onClick={onClose}>
                                <CloseOutlined />
                            </Button>
                        }
                    >
                        <MenuItems isAdmin={isOwner} />
                    </Drawer>
                </>
            ) : (
                // Larger Screens
                <MenuItems isAdmin={isOwner} />
            )}
        </Sider>
    );
};

export default SideAppDrawer;