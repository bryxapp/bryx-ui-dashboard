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

    // Calculate the height based on the item's height, assuming each row height is 150px and there's a 16px gap.
    // Adjust the height accordingly if your items have different heights or if you have more/less padding.
    const containerHeight = 3 * (150 + 16) - 16 + 'px'; // for 3 rows, adjust '150' based on your actual item height

    return (
        <div style={{ height: containerHeight, overflowY: 'auto', padding: '16px' }}>
            <Row gutter={[16, 16]}>
                {userImages.map((imageData) => (
                    <Col key={imageData.url} span={8}> {/* Assuming each Col spans 8 units for 3 items per row */}
                        <UserImageCard
                            imageData={imageData}
                            userImages={userImages}
                            setUserImages={setUserImages}
                            setOpen={setOpen}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default UserImagesGrid;
