import React from 'react';
import { CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import UserImageCard from './UserImageCard';
import ErrorMessage from '../../../../../SharedComponents/ErrorMessage/ErrorMessage';
import { Row, Col } from 'antd';

interface UserImagesMenuProps {
    setCanvasDesign: (newDesign: CanvasDesignData) => void;
    userImages: Array<{ url: string; width: number; height: number; imageDbId: string }>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<{ url: string; width: number; height: number; imageDbId: string }>>>;
    setOpen: any;
    error: boolean;
}

const UserImagesGrid: React.FC<UserImagesMenuProps> = ({ setCanvasDesign, userImages, setUserImages, setOpen, error }) => {
    if (error) return <ErrorMessage dataName='user images' />;

    return (
        <div style={{ padding: '16px', overflowY: 'auto' }}>
            <Row>
                {userImages.map((imageData) => {
                    const width = (imageData.width / imageData.height) * 100;
                    return (
                        <Col key={imageData.url}>
                            <div style={{ width: `${width}px`, height: '100px', marginBottom: '16px' }}>
                                <UserImageCard
                                    imageData={imageData}
                                    userImages={userImages}
                                    setUserImages={setUserImages}
                                    setOpen={setOpen}
                                />
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default UserImagesGrid;