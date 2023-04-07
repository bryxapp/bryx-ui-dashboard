import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { CanvasDesignData, ImageObj } from '../../../../../utils/types/CanvasInterfaces';
import { createImageObj } from '../../../../../utils/types/ShapesFactory';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { getUserImages, uploadImage } from '../../../../../utils/user-images-api';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../../../../SharedComponents/Loading/Loading';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';

interface UserImagesMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function UserImagesMenu({ isLoading, canvasDesign, setCanvasDesign }: UserImagesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [images, setImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email || '';

    const handleImageClick = useCallback((imageData: { url: string; width: number; height: number; }) => {
        const newImage: ImageObj = createImageObj(imageData.url, imageData.width / 15, imageData.height / 15);

        setCanvasDesign((prevCanvasDesign: CanvasDesignData) => ({
            ...prevCanvasDesign,
            Shapes: [...prevCanvasDesign.Shapes, newImage]
        }));
        setAnchorEl(null);
    }, [setCanvasDesign, setAnchorEl]);

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await uploadImage(userId, file);
        await getUserImages(userId).then(async (response) => {
            const results = response.data;
            const imagePromises = results.map(async (image: any) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height };
            });

            const imageData = await Promise.all(imagePromises);
            setImages(imageData);
        });
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        const fetchUserImages = async () => {
            const response = await getUserImages(userId);
            const results = response.data;

            const imagePromises = results.map(async (image: any) => {
                const { width, height } = await getImageDimensions(image.imageBlobUrl);
                return { url: image.imageBlobUrl, width, height };
            });

            const imageData = await Promise.all(imagePromises);
            setImages(imageData);
            setLoading(false);
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

    if (loading) return <Loading />

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
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {images.map((imageData) => (
                            <Grid item xs={6} sm={4} md={3} key={imageData.url}>
                                <Card>
                                    <CardActionArea onClick={() => handleImageClick(imageData)}>
                                        <CardMedia component="img" src={imageData.url} alt="Image thumbnail" />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
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

