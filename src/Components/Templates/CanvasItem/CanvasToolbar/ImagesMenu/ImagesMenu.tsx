import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddImageIcon from '@mui/icons-material/AddPhotoAlternate';
import Tooltip from '@mui/material/Tooltip';
import PublicImages from './PublicImages/PublicImages';
import UserImages from './UserImages/UserImages';

interface ImagesMenuProps {
    isLoading: boolean;
}

export default function ImagesMenu({ isLoading }: ImagesMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <>
            <Tooltip title="Add an image from our library" placement="bottom">
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
                <PublicImages setAnchorEl={setAnchorEl} />
                <UserImages setAnchorEl={setAnchorEl} />
            </Menu>
        </>
    );
}
