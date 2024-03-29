import * as React from 'react';
import Grid from '@mui/material/Grid';
import { CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import UserImageCard from './UserImageCard';
import ErrorMessage from '../../../../../SharedComponents/ErrorMessage/ErrorMessage';

interface UserImagesMenuProps {
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    userImages: Array<{ url: string; width: number; height: number; imageDbId: string }>;
    setUserImages: React.Dispatch<React.SetStateAction<Array<{ url: string; width: number; height: number; imageDbId: string }>>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    error: boolean;
}

export default function UserImagesGrid({ setCanvasDesign, userImages, setUserImages, setAnchorEl, error }: UserImagesMenuProps) {

    if (error) return <ErrorMessage dataName='user images' />

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {userImages.map((imageData) => (
                <Grid item xs={6} sm={4} md={3} key={imageData.url}>
                    <UserImageCard
                        imageData={imageData}
                        userImages={userImages}
                        setUserImages={setUserImages}
                        setAnchorEl={setAnchorEl}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

