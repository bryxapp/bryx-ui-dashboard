import React, { useCallback, useState } from 'react';
import { Button, Tooltip, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import logger from '../../../../../../logging/logger';
import { uploadImage, getUserImages, getImageDimensions } from '../../../../../../utils/api/user-images-api';
import { useAuth0User } from '../../../../../../utils/customHooks/useAuth0User';
import ErrorModal from '../../../../../SharedComponents/ErrorModal/ErrorModal';

interface NewUserImageButtonProps {
    maxUserImagesReached: boolean;
    setMaxUserImagesReached: React.Dispatch<React.SetStateAction<boolean>>;
    setFetchingUserImages: React.Dispatch<React.SetStateAction<boolean>>;
    setUserImages: React.Dispatch<React.SetStateAction<{ url: string; width: number; height: number; imageDbId: string }[]>>;
}

type ImageApiResponse = {
    imageBlobUrl: string;
    id: string;
};

const NewUserImageButton: React.FC<NewUserImageButtonProps> = ({ maxUserImagesReached, setMaxUserImagesReached, setFetchingUserImages, setUserImages }) => {
    const { auth0User, getAccessToken } = useAuth0User();
    const [error, setError] = useState(false); // Error state

    const handleImageUpload = useCallback(async (file: File) => {
        try {
            setError(false);
            setFetchingUserImages(true);
            const token = await getAccessToken();
            if (!token) return;

            await uploadImage(file, token);
            const response = await getUserImages(token);
            const results = response.userImages;
            setMaxUserImagesReached(response.maxUserImagesReached);

            const imagePromises = results.map(async (image: ImageApiResponse) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
            });

            const imageData = await Promise.all(imagePromises);
            setUserImages(imageData);
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Image Upload Error",
                    page: "Canvas",
                    description: "Error uploading image",
                    error: error,
                },
            });
            setError(true);
            console.log("Error uploading image:", error);
        } finally {
            setFetchingUserImages(false);
            logger.trackEvent({
                name: 'New UserImage Click',
                properties: { menu: 'New User Image', user: auth0User?.name, environment: process.env.NODE_ENV },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    const tooltipTitle = maxUserImagesReached
        ? "Maximum number of user images reached"
        : "";

    return (
        <>
            <ErrorModal error={error} setError={setError} content="Error uploading image" />
            <Tooltip title={tooltipTitle}>
                <Upload
                    beforeUpload={(file) => {
                        handleImageUpload(file);
                        return false;
                    }}
                    showUploadList={false}
                    disabled={maxUserImagesReached}
                >
                    <Button icon={<UploadOutlined />} disabled={maxUserImagesReached}>Upload Image</Button>
                </Upload>
            </Tooltip>
        </>
    );
};

export default NewUserImageButton;