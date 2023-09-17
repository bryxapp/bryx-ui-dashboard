import * as React from 'react';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import { getUserImages, getImageDimensions } from '../../../../../utils/api/user-images-api';
import UserImageCard from './UserImageCard';
import { useAccessToken } from '../../../../../utils/customHooks/useAccessToken';

interface UserImagesMenuProps {
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    userImages: Array<{ url: string; width: number; height: number; imageDbId: string }>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<{ url: string; width: number; height: number; imageDbId: string }>>>;
    setFetchingUserImages: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    setMaxUserImagesReached: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserImagesGrid({ setCanvasDesign, userImages, setUserImages, setFetchingUserImages, setAnchorEl, setMaxUserImagesReached }: UserImagesMenuProps) {
    const { getAccessToken } = useAccessToken();

    useEffect(() => {
        let isCancelled = false; // Cancellation token

        const fetchUserImages = async () => {
            try {
                const token = await getAccessToken();
                if (!token || isCancelled) return;

                const response = await getUserImages(token);
                const results = response.data.userImages;

                const imagePromises = results.map(async (image: any) => {
                    const { width, height } = await getImageDimensions(image.imageBlobUrl);
                    return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
                });

                const imageData = await Promise.all(imagePromises);

                if (!isCancelled) {
                    setUserImages(imageData);
                    setMaxUserImagesReached(response.data.maxUserImagesReached);
                    setFetchingUserImages(false);
                }
            } catch (error) {
                // Handle error as needed
                console.error(error);
            }
        };

        fetchUserImages();

        return () => {
            isCancelled = true; // Cancel any pending async operations if the component unmounts
        };
    }, [getAccessToken]);

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {userImages.map((imageData) => (
                <Grid item xs={6} sm={4} md={3} key={imageData.url}>
                    <UserImageCard
                        setCanvasDesign={setCanvasDesign}
                        imageData={imageData}
                        userImages={userImages}
                        setUserImages={setUserImages}
                        setAnchorEl={setAnchorEl}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

