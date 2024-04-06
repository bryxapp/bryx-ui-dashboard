import React, { useCallback } from 'react';
import { Image } from 'antd';
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
    setOpen: any;
}

interface ImageData {
    url: string;
    width: number;
    height: number;
    imageDbId: string;
}

export default function UserImageCard({ imageData, setOpen, userImages, setUserImages }: UserImageProps) {
    const { setCanvasDesign } = useCanvasDesignContext();
    const { getAccessToken } = useAuth0User();
    const { url, width, height } = imageData;
    const imgheight = height / width * 300;

    const handleImageClick = useCallback(() => {
        const newCanvasImage: ImageObj = createImageObj(url, 300, imgheight);
        setCanvasDesign((prevCanvasDesign: CanvasDesignData) => ({
            ...prevCanvasDesign,
            Shapes: [...prevCanvasDesign.Shapes, newCanvasImage]
        }));
        setOpen(false);
    }, [url, imgheight, setCanvasDesign, setOpen]);

    const handleImageDelete = useCallback(async () => {
        try {
            const imageDBIdToDelete = userImages.find(image => image.url === imageData.url)?.imageDbId;
            if (!imageDBIdToDelete) return;

            const token = await getAccessToken();
            if (!token) return;

            await deleteImage(imageDBIdToDelete, token);

            setUserImages(prevImages => prevImages.filter(image => image.url !== imageData.url));
        } catch (error) {
            console.error(error);
        }
    }, [getAccessToken, imageData, setUserImages, userImages]);

    return (
        <div>
            <Image
                width={150}
                src={imageData.url}
                alt="Image thumbnail"
                onClick={handleImageClick}
                preview={false}
            />
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
                onClick={event => {
                    event.stopPropagation();
                    handleImageDelete();
                }}
            >
                <DeleteOutlined />
            </div>
            </div>
    );
}
