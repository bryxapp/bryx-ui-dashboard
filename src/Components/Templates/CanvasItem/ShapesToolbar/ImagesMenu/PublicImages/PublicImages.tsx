import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { ImageObj } from '../../../../../../utils/types/CanvasInterfaces';
import { searchUnsplashImages } from '../../../../../../utils/api/unsplash-images-api';
import { Button, Input, Modal, Typography } from 'antd';
import { createStockImageObj } from '../../../../../../utils/types/ShapesFactory';
import logger from '../../../../../../logging/logger';
import PublicImagesGrid from './PublicImagesGrid/PublicImagesGrid';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface PublicImagesMenuProps {
    open: boolean;
    setOpen: any
}

export default function PublicImages({ open, setOpen }: PublicImagesMenuProps) {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [unsplashImages, setUnsplashImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const [error, setError] = useState(false);

    const searchImages = useCallback(async (query: string) => {
        try {
            setError(false);
            const unsplashImages = await searchUnsplashImages(query);
            setUnsplashImages(unsplashImages.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
                url: image.urls.small,
                width: image.width,
                height: image.height
            })));
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Image Search Error",
                    page: "Canvas",
                    description: "Error searching images",
                    error: error,
                },
            });
            setError(true);
            console.error("Error searching images:", error);
        }
    }, []);

    useEffect(() => {
        // Call searchImages with 'dog' on initial component mount
        searchImages('dog');
    }, [searchImages]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchImages(searchQuery);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleImageClick = (imageData: { url: string; width: number; height: number; }) => {
        const newImage: ImageObj = createStockImageObj(imageData.url, imageData.width / 15, imageData.height / 15);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newImage]
        });
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            title="Search Stock Images"
            onCancel={handleCancel}
            footer={[]}
            width={800}
        >
            <Input
                value={searchQuery}
                placeholder='Search images...'
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
            />
            <Button type="primary" onClick={handleSearch} style={{ margin: '10px 0' }}>
                Search
            </Button>
            <PublicImagesGrid unsplashImages={unsplashImages} handleImageClick={handleImageClick} error={error} />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Powered by Unsplash
            </Typography.Text>
        </Modal>
    );
}
