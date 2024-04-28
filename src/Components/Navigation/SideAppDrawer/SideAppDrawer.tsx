import { useState, useEffect } from 'react';
import MenuItems from '../MenuItems/MenuItems';
import { Drawer, Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';
import Sider from 'antd/es/layout/Sider';
import Subscription from './Subscription/Subscription';

const SideAppDrawer = () => {
    const { isOwner } = useOrganizationContext();
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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
                        open={open}
                        extra={
                            <Button type="text" onClick={onClose}>
                                <CloseOutlined />
                            </Button>
                        }
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <MenuItems isAdmin={isOwner} />
                            <div style={{ marginTop: 'auto' }}>
                                <Subscription/>
                            </div>
                        </div>
                    </Drawer>
                </>
            ) : (
                // Larger Screens
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div>
                        <MenuItems isAdmin={isOwner} />
                    </div>
                    <div style={{ marginTop: 'auto', marginBottom: "1rem", alignSelf: "center" }}>
                    <Subscription/>
                    </div>
                </div>
            )}
        </Sider>
    );
};

export default SideAppDrawer;
