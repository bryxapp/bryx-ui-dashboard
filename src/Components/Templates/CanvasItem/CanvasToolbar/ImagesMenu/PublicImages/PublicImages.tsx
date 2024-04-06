import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { ImageObj } from '../../../../../../utils/types/CanvasInterfaces';
import { searchUnsplashImages } from '../../../../../../utils/api/unsplash-images-api';
import { Input, Typography } from 'antd';
import { createImageObj } from '../../../../../../utils/types/ShapesFactory';
import logger from '../../../../../../logging/logger';
import PublicImagesGrid from './PublicImagesGrid/PublicImagesGrid';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface PublicImagesMenuProps {
    setOpen: any
}

export default function PublicImages({ setOpen }: PublicImagesMenuProps) {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [unsplashImages, setUnsplashImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevSearchQueryRef = useRef<string>('');
    const [error, setError] = useState(false);

    const searchImages = useCallback(async (query: string) => {
        try {
            setError(false);
            const unsplashImages = await searchUnsplashImages(query)
            setUnsplashImages(unsplashImages.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
                url: image.urls.small,
                width: image.width,
                height: image.height
            })));
        }
        catch (error) {
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
        setOpen(false);
    };

    return (
        <div style={{ 'margin': '1vh' }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
                Search Stock Images
            </Typography.Title>
            <Input
                value={searchQuery}
                placeholder='dogs'
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
            />
            <Typography.Text>
                Powered by Unsplash
            </Typography.Text>
            <PublicImagesGrid unsplashImages={unsplashImages} handleImageClick={handleImageClick} error={error} />
        </div>
    );
}
