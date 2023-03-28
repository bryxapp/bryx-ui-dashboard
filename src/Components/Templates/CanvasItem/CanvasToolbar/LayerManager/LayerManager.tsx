import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import LayerIcon from '@mui/icons-material/Layers';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import SendBackward from './SendBackward';
import BringForward from './BringForward';
import Stack from '@mui/material/Stack';


interface LayerManagerProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    selectedId: string | null;
}


export default function LayerManager({ isLoading, canvasDesign, setCanvasDesign, selectedId }: LayerManagerProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Expand Layer Manager" placement="bottom">
                <span>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                        disabled={isLoading || !selectedId}
                    >
                        <LayerIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1}>
                    <SendBackward canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                    <BringForward canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                </Stack>
            </Menu>
        </>
    );
}