import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import { CanvasDesignData, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import TextStyler from './TextStyler';

interface TextStylerProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TextStylerMenu({ isLoading, canvasDesign, setCanvasDesign }: TextStylerProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isTextObject = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId)?.type.includes('Text')

    return (
        <>
            <Tooltip title="Change Text Style" placement="bottom">
                <span>
                    <IconButton
                        id="font-size-selector"
                        aria-controls="font-size-selector-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpen}
                        color="inherit"
                        disabled={isLoading || !isTextObject}
                    >
                        <FontSizeSelectorIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Menu
                id="font-style-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
                <TextStyler canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            </Menu>
        </>
    );
}

export default TextStylerMenu;
