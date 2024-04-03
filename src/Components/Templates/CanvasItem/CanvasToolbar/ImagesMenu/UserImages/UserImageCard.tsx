import React, { useCallback } from 'react';
import { Card, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CanvasDesignData, ImageObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createImageObj } from '../../../../../../utils/types/ShapesFactory';
import { deleteImage } from '../../../../../../utils/api/user-images-api';
import { useAuth0User } from '../../../../../../utils/customHooks/useAuth0User';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface UserImageProps {
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


export default function UserImageCard({ imageData, setAnchorEl, userImages, setUserImages }: UserImageProps) {
    const { setCanvasDesign } = useCanvasDesignContext();
    const { auth0User, getAccessToken } = useAuth0User();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth0User?.sub, userImages]
    );
    return (
        <Card onClick={() => handleImageClick(imageData)}>
            <Image src={imageData.url} alt="Image thumbnail" />
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
                    event.stopPropagation(); // Prevent click event from propagating to the Card
                    handleImageDelete(imageData.url);
                }}
            >
                <DeleteOutlined />
            </div>
        </Card>
    );
};