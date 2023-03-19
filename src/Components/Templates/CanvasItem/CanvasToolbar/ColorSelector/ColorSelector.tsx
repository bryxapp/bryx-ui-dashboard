import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ColorSelectorIcon from '@mui/icons-material/ColorLens';
import { ChromePicker } from 'react-color';

export default function ColorSelector({ isLoading, canvasDesign, setCanvasDesign, color, setColor, selectedId }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onColorChange = (color: any) => {
        setColor(color.hex);
        const updatedCanvasDesign: any = {};

        Object.keys(canvasDesign).forEach((shapeType: string) => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                if (shape.id !== selectedId) {
                    return shape;
                }
                const updatedShape = {
                    ...shape,
                    fill: color.hex,
                };
                return updatedShape;
            });
        });

        setCanvasDesign(updatedCanvasDesign);
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
                    disabled={isLoading || !selectedId}
                >
                    <ColorSelectorIcon />
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
                <ChromePicker color={color} onChange={onColorChange} />
            </Menu>
        </>
    );
}