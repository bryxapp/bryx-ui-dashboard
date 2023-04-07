import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddImageIcon from '@mui/icons-material/AddPhotoAlternate';
import Tooltip from '@mui/material/Tooltip';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import ImagesSearch from './ImagesSearch';
import UserImages from './UserImages';
import { searchUnsplashImages } from '../../../../../utils/unsplash-images-api';

interface ImagesMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function ImagesMenu({ isLoading, canvasDesign, setCanvasDesign }: ImagesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [unsplashImages, setUnsplashImages] = useState<Array<{ url: string; width: number; height: number; }>>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevSearchQueryRef = useRef<string>('');

    const searchImages = useCallback((query: string) => {
        searchUnsplashImages(query).then((results) => {
            setUnsplashImages(results.map((image: { urls: { small: string; }; width: number; height: number; }) => ({
                url: image.urls.small,
                width: image.width,
                height: image.height
            })));
        });
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

    return (
        <>
            <Tooltip title="Add Image" placement="bottom">
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
                <ImagesSearch
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                    setAnchorEl={setAnchorEl}
                    images={unsplashImages}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
                <UserImages canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
            </Menu>
        </>
    );
}
