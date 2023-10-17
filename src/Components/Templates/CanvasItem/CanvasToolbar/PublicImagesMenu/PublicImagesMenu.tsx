import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddImageIcon from '@mui/icons-material/AddPhotoAlternate';
import Tooltip from '@mui/material/Tooltip';
import { CanvasDesignData, ImageObj } from '../../../../../utils/types/CanvasInterfaces';
import { searchUnsplashImages } from '../../../../../utils/api/unsplash-images-api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { createImageObj } from '../../../../../utils/types/ShapesFactory';

interface PublicImagesMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function PublicImagesMenu({ isLoading, canvasDesign, setCanvasDesign }: PublicImagesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [unsplashImages, setUnsplashImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevSearchQueryRef = useRef<string>('');

    const searchImages = useCallback(async (query: string) => {
        const unsplashImages = await searchUnsplashImages(query)
        setUnsplashImages(unsplashImages.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
            url: image.urls.small,
            width: image.width,
            height: image.height
        })));
    }, []);

    useEffect(() => {
        searchImages('dog');
        prevSearchQueryRef.current = 'dog';
    }, [searchImages]);

    useEffect(() => {
        if (searchQuery && searchQuery !== prevSearchQueryRef.current) {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                searchImages(searchQuery);

                // Update the previous search query ref
                prevSearchQueryRef.current = searchQuery;
            }, 800); //800ms debounce
        }
    }, [searchQuery, searchImages]);

    const handleImageClick = (imageData: { url: string; width: number; height: number; }) => {
        const newImage: ImageObj = createImageObj(imageData.url, imageData.width / 15, imageData.height / 15);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newImage]
        });
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Add an image from our library" placement="bottom">
                <IconButton
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                    disabled={isLoading}
                >
                    <AddImageIcon />
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
                    <TextField
                        label="Search Images"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Typography variant="body2">
                        Powered by Unsplash
                    </Typography>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {unsplashImages.map((imageData) => (
                            <Grid item xs={6} sm={4} md={3} key={imageData.url}>
                                <Card>
                                    <CardActionArea onClick={() => handleImageClick(imageData)}>
                                        <CardMedia component="img" src={imageData.url} alt="Image thumbnail" />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Menu>
        </>
    );
}
