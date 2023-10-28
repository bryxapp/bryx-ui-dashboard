import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import ErrorMessage from '../../../../../SharedComponents/ErrorMessage/ErrorMessage';

interface PublicImagesGridProps {
    unsplashImages: Array<{ url: string; width: number; height: number; }>;
    handleImageClick: (imageData: { url: string; width: number; height: number; }) => void;
    error: boolean;
}

export default function PublicImagesGrid({ error, unsplashImages, handleImageClick }: PublicImagesGridProps) {
    if (error) return <ErrorMessage dataName="Unpsplash Images" />;
    return (
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
    );
}

