import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddTextIcon from '@mui/icons-material/TextFields';
import Tooltip from '@mui/material/Tooltip';
import AddHeading from './AddHeading';
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import AddPhoneInput from './Inputs/AddPhoneInput';
import AddEmailInput from './Inputs/AddEmailInput';
import AddParagraph from './AddParagraph';
import AddShortTextInput from './Inputs/AddShortTextInput';

interface TextMenuProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function TextMenu({ isLoading, canvasDesign, setCanvasDesign }: TextMenuProps) {
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
            <Tooltip title="Add new text item" placement="bottom">
                <span>
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
                <AddHeading canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddParagraph canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddPhoneInput canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddEmailInput canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
                <AddShortTextInput canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} setAnchorEl={setAnchorEl} />
            </Menu>
        </>
    );
}
