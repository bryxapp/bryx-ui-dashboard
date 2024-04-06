import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import Loading from '../../../../../SharedComponents/Loading/Loading';
import NewUserImageButton from './NewUserImageButton';
import UserImagesGrid from './UserImagesGrid';
import { getImageDimensions, getUserImages } from '../../../../../../utils/api/user-images-api';
import logger from '../../../../../../logging/logger';
import { useAuth0User } from '../../../../../../utils/customHooks/useAuth0User';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface UserImagesMenuProps {
    setOpen: any;
}

export default function UserImagesMenu({ setOpen }: UserImagesMenuProps) {
    const { setCanvasDesign } = useCanvasDesignContext();

    const [userImages, setUserImages] = useState<Array<{ url: string; width: number; height: number; imageDbId: string }>>([]);
    const [maxUserImagesReached, setMaxUserImagesReached] = useState(false);
    const [fetchingUserImages, setFetchingUserImages] = useState(true);

    const { auth0User, getAccessToken } = useAuth0User();
    const [error, setError] = useState(false);

    useEffect(() => {
        let isCancelled = false; // Cancellation token

        const fetchUserImages = async () => {
            try {
                setError(false);
                const token = await getAccessToken();
                if (!token || isCancelled) return;

                const response = await getUserImages(token);
                const results = response.userImages;

                const imagePromises = results.map(async (image: any) => {
                    const { width, height } = await getImageDimensions(image.imageBlobUrl);
                    return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
                });

                const imageData = await Promise.all(imagePromises);

                if (!isCancelled) {
                    setUserImages(imageData);
                    setMaxUserImagesReached(response.maxUserImagesReached);
                    setFetchingUserImages(false);
                }
            } catch (error) {
                logger.trackException({
                    properties: {
                        name: "User Images Fetch Error",
                        page: "Canvas",
                        description: "Error fetching user images",
                        error: error,
                    },
                });
                setError(true);
                setFetchingUserImages(false);
                console.error(error);
            }
        };

        fetchUserImages();

        return () => {
            isCancelled = true; // Cancel any pending async operations if the component unmounts
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    return (
        <div style={{ 'margin': '1vh' }}>
            <Typography.Text>
                Use your own images
            </Typography.Text>
            {fetchingUserImages ? (
                <Loading />
            ) : (
                <UserImagesGrid
                    setCanvasDesign={setCanvasDesign}
                    userImages={userImages}
                    setUserImages={setUserImages}
                    setOpen={setOpen}
                    error={error}
                />
            )}
            <NewUserImageButton maxUserImagesReached={maxUserImagesReached} setFetchingUserImages={setFetchingUserImages} setUserImages={setUserImages} />
        </div>
    );
}

