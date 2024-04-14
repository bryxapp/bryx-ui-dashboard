import React from "react";
import { Typography, Card, Button, Space } from 'antd';
import CanvasStarterList from "./CanvasStarterList/CanvasStarterList";
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const SelectCanvasStarter = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/create-template')
    }

    return (
        <React.Fragment>
            <Title level={2}>Choose a Starter Canvas or Create a New Design</Title>
            <Paragraph>
                Get started by selecting a starter canvas or creating a new design from scratch.
            </Paragraph>
            <Space size="large" direction="vertical" style={{ width: '100%' }}>
                <Card>
                    <CanvasStarterList />
                </Card>
                <Button type="primary" size="large" onClick={handleButtonClick}>Start From Scratch</Button>
            </Space>
        </React.Fragment>
    )
}

export default SelectCanvasStarter;