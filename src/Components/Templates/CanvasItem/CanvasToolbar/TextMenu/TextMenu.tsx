import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddTextIcon from '@mui/icons-material/TextFields';
import Tooltip from '@mui/material/Tooltip';
import AddTextField from './AddTextField';
import AddTextInput from './AddTextInput';

export default function TextMenu({ isLoading, canvasDesign, setCanvasDesign }: any) {
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
            <Tooltip title="Expand Shape Menu" placement="bottom">
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="inherit"
                    disabled={isLoading}
                >
                    <AddTextIcon />
                </IconButton>
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
                <AddTextField canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddTextInput canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
            </Menu>
        </>
    );
}