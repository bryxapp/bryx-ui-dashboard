import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ColorSelectorIcon from '@mui/icons-material/ColorLens';
import { ChromePicker } from 'react-color';
import { CanvasDesignData, ShapeColor, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useState } from 'react';

interface ColorPickerProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: ShapeColor;
    setColor: React.SetStateAction<any>;
}


export default function ColorPicker({ isLoading, canvasDesign, setCanvasDesign, color, setColor }: ColorPickerProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [tempSelectedId, setTempSelectedId] = useState<string | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTempSelectedId(canvasDesign.selectedId);
        setCanvasDesign({ ...canvasDesign, selectedId: "ColorPicker" });
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setCanvasDesign({ ...canvasDesign, selectedId: tempSelectedId });
        setAnchorEl(null);
    };

    const onColorChange = (colorResult: { hex: string }) => {
        // Update only the fill property of the color state
        setColor((prevColor: any) => ({ ...prevColor, fill: colorResult.hex }));
        
        // Create a new updated canvas design object
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
        updatedCanvasDesign.Shapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === canvasDesign.selectedId || shape.id === tempSelectedId) {
                // Update only the fill property of the shape, keep other properties unchanged
                return { ...shape, fill: colorResult.hex };
            }
            return shape;
        });
        
        // Update the canvas design state
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
                <ChromePicker color={color.fill} onChange={onColorChange} disableAlpha={true} />
            </Menu>
        </>
    );
}