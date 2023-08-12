import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth0 } from '@auth0/auth0-react';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import { getUserImages, uploadImage } from '../../../../../utils/api/user-images-api';
import Loading from '../../../../SharedComponents/Loading/Loading';
import UserImageCard from './UserImageCard';

interface UserImagesMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
}


type ImageApiResponse = {
    imageBlobUrl: string;
    id: string;
};

export default function UserImagesMenu({ isLoading, setCanvasDesign }: UserImagesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [userImages, setUserImages] = useState<Array<{ url: string; width: number; height: number; imageDbId: string }>>([]);
    const [fetchingUserImages, setFetchingUserImages] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email || '';

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFetchingUserImages(true);
        await uploadImage(userId, file);
        await getUserImages(userId).then(async (response) => {
            const results = response.data;
            const imagePromises = results.map(async (image: ImageApiResponse) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
            });
            const imageData = await Promise.all(imagePromises);
            setUserImages(imageData);
            setFetchingUserImages(false);
        });
    }, [userId]);


    useEffect(() => {
        if (!userId) {
            setFetchingUserImages(false);
            return;
        }
        const fetchUserImages = async () => {
            const response = await getUserImages(userId);
            const results = response.data;

            const imagePromises = results.map(async (image: any) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height, imageDbId: image.id };
            });

            const imageData = await Promise.all(imagePromises);
            setUserImages(imageData);
            setFetchingUserImages(false);
        };

        fetchUserImages();
    }, [userId]);

    const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width * 2, height: img.height * 2 });
            img.onerror = reject;
            img.src = url;
        });
    };

    return (
        <>
            <Tooltip title="Add Your Own Image" placement="bottom">
                <IconButton
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                    disabled={isLoading}
                >
                    <CloudUploadIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                        maxHeight: '100vh',
                        width: '600px',
                        overflow: 'auto',
                    },
                }}
            >
                <div style={{ 'margin': '1vh' }}>
                    <Typography variant="body2">
                        Use your own images
                    </Typography>
                    {fetchingUserImages ? (
                        <Loading />
                    ) : (
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
                    )}
                    <Button variant="contained" component="label">
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleImageUpload}
                        />
                    </Button>
                </div>
            </Menu>
        </>
    );
}

