import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import AddShapeIcon from '@mui/icons-material/ShapeLineOutlined';
import AddEllipse from './AddEllipse';
import AddRectangle from './AddRectangle';
import AddRoundedRectangle from './AddRoundedRectangle';

interface ShapesMenuProps {
    isLoading: boolean;
}

export default function ShapesMenu({ isLoading }: ShapesMenuProps) {
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
            <Tooltip title="Add new shape" placement="bottom">
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="inherit"
                    disabled={isLoading}
                >
                    <AddShapeIcon />
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
                <AddRectangle setAnchorEl={setAnchorEl} />
                <AddRoundedRectangle setAnchorEl={setAnchorEl} />
                <AddEllipse setAnchorEl={setAnchorEl} />
            </Menu>
        </>
    );
}
