import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CanvasDesignData, ImageObj } from '../../../../../utils/types/CanvasInterfaces';
import { createImageObj } from '../../../../../utils/types/ShapesFactory';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { searchUnsplashImages } from '../../../../../utils/images-api';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

interface ImagesSearchProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    setAnchorEl: React.SetStateAction<any>;
}

export default function ImagesSearch({ canvasDesign, setCanvasDesign, setAnchorEl }: ImagesSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleImageClick = (imageData: { url: string; width: number; height: number; }) => {
        const newImage: ImageObj = createImageObj(imageData.url, imageData.width / 15, imageData.height / 15);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newImage]
        });
        setAnchorEl(null);
    };

    //On first load search "dog" images

    useEffect(() => {
        searchUnsplashImages('dog').then((results) => {
            setImages(results.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
                url: image.urls.small,
                width: image.width,
                height: image.height
            })));
        });
    }, []);


    useEffect(() => {
        if (searchQuery) {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                console.log('searchQuery2', searchQuery);
                searchUnsplashImages(searchQuery).then((results) => {
                    setImages(results.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
                        url: image.urls.small,
                        width: image.width,
                        height: image.height
                    })));
                });
            }, 800); //800ms debounce
        }
    }, [searchQuery]);

    return (
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
        </div>
    );
}
