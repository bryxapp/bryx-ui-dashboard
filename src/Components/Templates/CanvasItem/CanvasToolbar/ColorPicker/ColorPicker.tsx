import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ColorSelectorIcon from '@mui/icons-material/ColorLens';
import { ChromePicker } from 'react-color';
import { CanvasDesignData, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';

interface ColorPickerProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: string;
    setColor: React.SetStateAction<any>;
}


export default function ColorPicker({ isLoading, canvasDesign, setCanvasDesign, color, setColor }: ColorPickerProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onColorChange = (color:any) => {
        setColor(color.hex);
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };

        canvasDesign.Shapes.forEach((shape: ShapeObj) => {
            if (shape.id === canvasDesign.selectedId) {
                updatedCanvasDesign.Shapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
                    if (shape.id !== canvasDesign.selectedId) {
                        return shape;
                    }
                    const updatedShape = {
                        ...shape,
                        fill: color.hex,
                    };
                    return updatedShape;
                });
            }
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const isImage = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId)?.type.includes('Image')

    return (
        <>
            <Tooltip title="Expand Shape Menu" placement="bottom">
                <span>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                        disabled={isLoading || isImage || !canvasDesign.selectedId}
                    >
                        <ColorSelectorIcon />
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
                <ChromePicker color={color} onChange={onColorChange} />
            </Menu>
        </>
    );
}