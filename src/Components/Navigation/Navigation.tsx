import React from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Sidebar from './SideAppDrawer/SideAppDrawer';
import { useAuth0User } from '../../utils/customHooks/useAuth0User';
import { Layout } from 'antd';
const { Content } = Layout;

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation = ({ children }: NavigationProps) => {
    const { auth0User } = useAuth0User();
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <TopNavBar />
            <Layout>
                {auth0User && (<Sidebar />)}
                <Content>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Navigation;
