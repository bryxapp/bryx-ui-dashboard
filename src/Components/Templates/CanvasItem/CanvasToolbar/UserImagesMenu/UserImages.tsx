import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import Loading from '../../../../SharedComponents/Loading/Loading';
import NewUserImageButton from './NewUserImageButton';
import UserImagesGrid from './UserImagesGrid';

interface UserImagesMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
}

export default function UserImagesMenu({ isLoading, setCanvasDesign }: UserImagesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [userImages, setUserImages] = useState<Array<{ url: string; width: number; height: number; imageDbId: string }>>([]);
    const [maxUserImagesReached, setMaxUserImagesReached] = useState(false);
    const [fetchingUserImages, setFetchingUserImages] = useState(true);

    return (
        <>
            <Tooltip title="Add Your Own Image" placement="bottom">
                <IconButton
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                    disabled={isLoading}
                >
                    <CloudUploadIcon />
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
                <div style={{ 'margin': '1vh' }}>
                    <Typography variant="body2">
                        Use your own images
                    </Typography>
                    {fetchingUserImages ? (
                        <Loading />
                    ) : (
                        <UserImagesGrid
                            setCanvasDesign={setCanvasDesign}
                            userImages={userImages}
                            setUserImages={setUserImages}
                            setFetchingUserImages={setFetchingUserImages}
                            setAnchorEl={setAnchorEl}
                            setMaxUserImagesReached = {setMaxUserImagesReached}
                        />
                    )}
                    <NewUserImageButton maxUserImagesReached={maxUserImagesReached} setFetchingUserImages={setFetchingUserImages} setUserImages={setUserImages} />
                </div>
            </Menu>
        </>
    );
}

