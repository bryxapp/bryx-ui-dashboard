import React from 'react';
import { Col, Row } from 'antd';
import ErrorMessage from '../../../../../../SharedComponents/ErrorMessage/ErrorMessage';

interface PublicImagesGridProps {
    unsplashImages: Array<{ url: string; width: number; height: number; }>;
    handleImageClick: (imageData: { url: string; width: number; height: number; }) => void;
    error: boolean;
}

const PublicImagesGrid: React.FC<PublicImagesGridProps> = ({ error, unsplashImages, handleImageClick }) => {
    if (error) return <ErrorMessage dataName="Unpsplash Images" />;

    return (
        <Row gutter={[16, 16]} style={{ padding: '16px' }}>
            {unsplashImages.map((imageData, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <img onClick={() => handleImageClick(imageData)} src={imageData.url} alt="thumbnail" style={{ width: '100%' }} />
                </Col>
            ))}
        </Row>
    );
}

export default PublicImagesGrid;