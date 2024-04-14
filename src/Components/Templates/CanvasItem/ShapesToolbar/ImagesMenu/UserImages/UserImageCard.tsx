import React, { useCallback } from 'react';
import { Image, Modal } from 'antd';
import { MdCancel } from "react-icons/md";
import { CanvasDesignData, ImageObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createUserImageObj } from '../../../../../../utils/types/ShapesFactory';
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
        const newCanvasImage: ImageObj = createUserImageObj(url, 300, imgheight);
        setCanvasDesign((prevCanvasDesign: CanvasDesignData) => ({
            ...prevCanvasDesign,
            Shapes: [...prevCanvasDesign.Shapes, newCanvasImage]
        }));
        setOpen(false);
    }, [url, imgheight, setCanvasDesign, setOpen]);

    const handleImageDelete = useCallback(async () => {
        const imageDBIdToDelete = userImages.find(image => image.url === imageData.url)?.imageDbId;
        if (!imageDBIdToDelete) return;

        // Use Ant Design's Modal for confirmation
        Modal.confirm({
            title: 'Are you sure you want to delete this image?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    const token = await getAccessToken();
                    if (!token) return;
                    await deleteImage(imageDBIdToDelete, token);
                    setUserImages(prevImages => prevImages.filter(image => image.url !== imageData.url));
                } catch (error) {
                    console.error(error);
                }
            },
        });
    }, [getAccessToken, imageData, setUserImages, userImages]);
    return (
        <div>
            <Image
                width={200}
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
                    padding: 4,
                }}
                onClick={event => {
                    event.stopPropagation();
                    handleImageDelete();
                }}
            >
                <MdCancel />
            </div>
        </div>
    );
}
