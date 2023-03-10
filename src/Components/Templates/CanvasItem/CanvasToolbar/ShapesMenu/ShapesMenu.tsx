import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AddShapeIcon from '@mui/icons-material/ShapeLineOutlined';
import AddCircle from './AddCircle';
import AddRectangle from './AddRectangle';
import AddLine from './AddLine';

export default function ShapesMenu({ isLoading, canvasDesign, setCanvasDesign }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
                disabled={isLoading}
            >
                <AddShapeIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <AddLine canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddRectangle canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddCircle canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
            </Menu>
        </div>
    );
}
