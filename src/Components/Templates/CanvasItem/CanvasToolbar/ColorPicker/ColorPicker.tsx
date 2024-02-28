import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ColorSelectorIcon from '@mui/icons-material/ColorLens';
import { ChromePicker } from 'react-color';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CanvasDesignData, ShapeColor, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { Box, Button, Slider } from '@mui/material';
import { findShape, updateShapeProperty } from '../../../../../utils/canvas-util';

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
    const [colorChangeMode, setColorChangeMode] = useState<'fill' | 'stroke'>('fill');
    const [strokeWidth, setStrokeWidth] = useState<number>(1);
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

    const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'fill' | 'stroke') => {
        if (newMode !== null) {
            setColorChangeMode(newMode);
        }
    };

    const onColorChange = (colorResult: { hex: string | undefined }) => {
        setColor((prevColor: any) => ({ ...prevColor, [colorChangeMode]: colorResult.hex }));
        
        updateShapeProperty(canvasDesign, setCanvasDesign, colorChangeMode, colorResult.hex, canvasDesign.selectedId);
        updateShapeProperty(canvasDesign, setCanvasDesign, colorChangeMode, colorResult.hex, tempSelectedId);

        // const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
        // updatedCanvasDesign.Shapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        //     if (shape.id === canvasDesign.selectedId || shape.id === tempSelectedId) {
        //         return { ...shape, [colorChangeMode]: colorResult.hex };
        //     }
        //     return shape;
        // });
        // setCanvasDesign(updatedCanvasDesign);
    };

    const handleStrokeWidthChange = (event: Event, newValue: number | number[]) => {
        const newWidth = Array.isArray(newValue) ? newValue[0] : newValue;
        setStrokeWidth(newWidth);

        // Update the stroke width of the selected shape immediately
        const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
        updatedCanvasDesign.Shapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === canvasDesign.selectedId || shape.id === tempSelectedId) {
                return { ...shape, strokeWidth: newWidth };
            }
            return shape;
        });

        setCanvasDesign(updatedCanvasDesign);
    };

    const isImage = findShape(canvasDesign, tempSelectedId)?.type.includes('Image')
    const selectedShape = findShape(canvasDesign,tempSelectedId);
    const isRectOrEllipse = selectedShape?.type === 'Rectangle' || selectedShape?.type === 'Ellipse' || selectedShape?.type === 'RoundedRectangle';
    const isTextObjectSelected = findShape(canvasDesign,tempSelectedId)?.type.includes('Text');
    const showColorModeToggle = !isLoading && selectedShape && isRectOrEllipse;

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
                {showColorModeToggle && (
                    <Box textAlign="center" my={2}>
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
                    </Box>)}
                <ChromePicker
                    color={colorChangeMode === 'fill' ? color.fill : color.stroke}
                    onChange={onColorChange}
                    disableAlpha={false}
                />
                {colorChangeMode === 'stroke' && (
                    <Box textAlign="center">
                        {/* stroke width slider */}
                        <Slider
                            style={{ width: "80%" }}
                            aria-label="Stroke Width"
                            value={strokeWidth}
                            onChange={handleStrokeWidthChange}
                            min={1}
                            max={20}
                            valueLabelDisplay="auto"
                        />
                    </Box>)}
                {!isTextObjectSelected && (
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            style={{ margin: "10px 0 0 0" }}
                            onClick={() => onColorChange({ hex: undefined })}>
                            Remove {colorChangeMode}
                        </Button>
                    </Box>
                )}
            </Menu>
        </>
    );
}
