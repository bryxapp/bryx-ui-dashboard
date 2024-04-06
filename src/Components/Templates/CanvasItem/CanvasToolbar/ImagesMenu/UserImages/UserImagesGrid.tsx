import React from 'react';
import { Row, Col } from 'antd';
import { CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import UserImageCard from './UserImageCard';
import ErrorMessage from '../../../../../SharedComponents/ErrorMessage/ErrorMessage';

interface UserImagesMenuProps {
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    userImages: Array<{ url: string; width: number; height: number; imageDbId: string }>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<{ url: string; width: number; height: number; imageDbId: string }>>>;
    setOpen: any;
    error: boolean;
}

const UserImagesGrid: React.FC<UserImagesMenuProps> = ({ setCanvasDesign, userImages, setUserImages, setOpen, error }) => {

    if (error) return <ErrorMessage dataName='user images' />;

    return (
        <Row gutter={[16, 16]} style={{ padding: '16px' }}>
            {userImages.map((imageData) => (
                <Col key={imageData.url}>
                    <UserImageCard
                        imageData={imageData}
                        userImages={userImages}
                        setUserImages={setUserImages}
                        setOpen={setOpen}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default UserImagesGrid;