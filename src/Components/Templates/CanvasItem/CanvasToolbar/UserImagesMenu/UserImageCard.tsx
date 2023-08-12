import * as React from 'react';
import { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Clear';
import { CanvasDesignData, ImageObj } from '../../../../../utils/types/CanvasInterfaces';
import { createImageObj } from '../../../../../utils/types/ShapesFactory';
import { deleteImage } from '../../../../../utils/api/user-images-api';
import Box from '@mui/material/Box';
import { useAccessToken } from '../../../../../utils/customHooks/useAccessToken';

interface UserImageProps {
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    imageData: ImageData;
    userImages: Array<ImageData>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<ImageData>>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;

}

type ImageData = {
    url: string;
    width: number;
    height: number;
    imageDbId: string;
};


export default function UserImageCard({ setCanvasDesign, imageData, setAnchorEl, userImages, setUserImages }: UserImageProps) {
    const { getAccessToken } = useAccessToken();

    const handleImageClick = useCallback((imageData: ImageData) => {
        //Create a canvas image object
        const newCanvasImage: ImageObj = createImageObj(imageData.url, imageData.width / 15, imageData.height / 15);
        //Add it to the canvas
        setCanvasDesign((prevCanvasDesign: CanvasDesignData) => ({
            ...prevCanvasDesign,
            Shapes: [...prevCanvasDesign.Shapes, newCanvasImage]
        }));

        setAnchorEl(null);
    }, [setCanvasDesign, setAnchorEl]);

    const handleImageDelete = useCallback(
        async (selectedToDeleteImageUrl: string) => {
            try {
                // Find the image database ID to delete
                const imageDBIdToDelete = userImages.find((image) => image.url === selectedToDeleteImageUrl)?.imageDbId;

                if (!imageDBIdToDelete) return;

                // Get the access token
                const token = await getAccessToken();
                if (!token) return;

                // Delete the image using the API utility
                await deleteImage(imageDBIdToDelete, token);

                // Remove the deleted image from the local state
                setUserImages((prevImages) =>
                    prevImages.filter((imageData) => imageData.url !== selectedToDeleteImageUrl)
                );
            } catch (error) {
                // Handle error as needed
                console.error(error);
            }
        },
        [getAccessToken, setUserImages, userImages]
    );



    return (
        <Card>
            <CardActionArea onClick={() => handleImageClick(imageData)}>
                <Box position="relative">
                    <CardMedia component="img" src={imageData.url} alt="Image thumbnail" />
                    <div
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'rgba(128, 128, 128, 0.7)',
                            padding: 4,
                            borderRadius: '50%',
                        }}
                        onClick={(event) => {
                            event.stopPropagation(); // Prevent click event from propagating to the CardActionArea
                            handleImageDelete(imageData.url);
                        }}
                    >
                        <DeleteIcon />
                    </div>
                </Box>
            </CardActionArea>
        </Card>
    )

}
