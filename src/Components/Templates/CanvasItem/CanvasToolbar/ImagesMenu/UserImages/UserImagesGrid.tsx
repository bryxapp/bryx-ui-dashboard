import React from 'react';
import { Row, Col } from 'antd';
import { CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import UserImageCard from './UserImageCard';
import ErrorMessage from '../../../../../SharedComponents/ErrorMessage/ErrorMessage';

interface UserImagesMenuProps {
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    userImages: Array<{ url: string; width: number; height: number; imageDbId: string }>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<{ url: string; width: number; height: number; imageDbId: string }>>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    error: boolean;
}

const UserImagesGrid: React.FC<UserImagesMenuProps> = ({ setCanvasDesign, userImages, setUserImages, setAnchorEl, error }) => {

    if (error) return <ErrorMessage dataName='user images' />;

    return (
        <Row gutter={[16, 16]} style={{ padding: '16px' }}>
            {userImages.map((imageData) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={imageData.url}>
                    <UserImageCard
                        imageData={imageData}
                        userImages={userImages}
                        setUserImages={setUserImages}
                        setAnchorEl={setAnchorEl}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default UserImagesGrid;