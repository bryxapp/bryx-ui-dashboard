import React, { useState } from 'react';
import { Box, Button, IconButton, Menu, Slider, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import ColorSelectorIcon from '@mui/icons-material/ColorLens';
import { MuiColorInput } from 'mui-color-input';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { CanvasDesignData, SolidShapeObj } from '../../../../../utils/types/CanvasInterfaces';

// Define the interface for component props
interface ColorPickerProps {
    solidShapeObj: SolidShapeObj;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
}

// ColorPicker component
export default function ColorPicker({ solidShapeObj, canvasDesign, setCanvasDesign }: ColorPickerProps) {
    // State for menu anchor element
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // State for color change mode (fill or stroke)
    const [colorChangeMode, setColorChangeMode] = useState<'fill' | 'stroke'>('fill');

    // State for stroke width
    const [strokeWidth, setStrokeWidth] = useState<number>(1);

    // Handle opening the color picker menu
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle closing the color picker menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle changing the color mode (fill or stroke)
    const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'fill' | 'stroke') => {
        if (newMode !== null) {
            setColorChangeMode(newMode);
        }
    };

    // Handle changing the color of the selected shape
    const onColorChange = (newColorValue: string) => {
        updateShapeProperty(
            canvasDesign,
            setCanvasDesign,
            colorChangeMode,
            newColorValue,
            canvasDesign.selectedId
        );
    };

    // Handle changing the stroke width
    const handleStrokeWidthChange = (event: Event, newValue: number | number[]) => {
        const newWidth = Array.isArray(newValue) ? newValue[0] : newValue;
        setStrokeWidth(newWidth);
        setCanvasDesign(prev => ({
            ...prev,
            Shapes: prev.Shapes.map(shape =>
                shape.id === canvasDesign.selectedId ? { ...shape, strokeWidth: newWidth } : shape
            ),
        }));
    };

    return (
        <>
            <IconButton
                id="color-picker-button"
                aria-controls={open ? 'color-picker-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <ColorSelectorIcon />
            </IconButton>
            <Menu
                id="color-picker-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'color-picker-button',
                }}
            >
                <Box sx={{ textAlign: 'center', width: '12em' }}>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={colorChangeMode}
                            exclusive
                            onChange={handleModeChange}
                            aria-label="color change mode"
                        >
                            <ToggleButton value="fill">Fill</ToggleButton>
                            <ToggleButton value="stroke">Stroke</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <MuiColorInput
                            format="hex"
                            value={colorChangeMode === 'fill' ? solidShapeObj.fill : solidShapeObj.stroke}
                            onChange={onColorChange}
                            sx={{ width: '8em', mx: 'auto' }}
                        />
                    </Box>
                    {colorChangeMode === 'stroke' && (
                        <Box sx={{ textAlign: 'center', mt: 1 }}>
                            <Tooltip title="Stroke Width" placement="bottom">
                                <Slider
                                    sx={{ width: '80%', mx: 'auto' }}
                                    aria-label="Stroke Width"
                                    value={strokeWidth}
                                    onChange={handleStrokeWidthChange}
                                    min={1}
                                    max={20}
                                    valueLabelDisplay="auto"
                                />
                            </Tooltip>
                        </Box>
                    )}
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => onColorChange('')}
                            sx={{ width: '12em' }}
                        >
                            Remove {colorChangeMode}
                        </Button>
                    </Box>
                </Box>
            </Menu>
        </>
    );
}
