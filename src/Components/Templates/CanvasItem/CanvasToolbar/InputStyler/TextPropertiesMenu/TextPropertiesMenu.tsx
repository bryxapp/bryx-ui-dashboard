import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import FontSizePicker from './FontSizePicker'
import FontFamilyPicker from './FontFamilyPicker'
import FontStylePicker from './FontStylePicker'
import FontDecorationPicker from './FontDecorationPicker'
import { CanvasDesignData, TextBase } from '../../../../../../utils/types/CanvasInterfaces';

interface TextPropertiesMenuProps {
    textObj: TextBase
    itemType: 'content' | 'label';
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TextPropertiesMenu({ textObj, itemType, canvasDesign, setCanvasDesign }: TextPropertiesMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <FontFamilyPicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                <FontSizePicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FontStylePicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <FontDecorationPicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
            </Menu>
        </>
    );
}

export default TextPropertiesMenu;