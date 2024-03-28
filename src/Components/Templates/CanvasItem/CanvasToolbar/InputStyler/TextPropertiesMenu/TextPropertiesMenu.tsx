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
import TextAlignmentPicker from './TextAlignmentPicker';
import TextColorPicker from './TextColorPicker';

interface TextPropertiesMenuProps {
    textObj: TextBase
    itemType: 'content' | 'label' | null;
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
                        style={{ color: textObj.fill }}
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
                        padding: '0 10px 0 10px',
                    },
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'space-evenly' }}>
                    <FontFamilyPicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <FontSizePicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                    <TextColorPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} textObj={textObj} itemType={itemType} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <FontStylePicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <FontDecorationPicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <TextAlignmentPicker textObj={textObj} itemType={itemType} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
            </Menu>
        </>
    );
}

export default TextPropertiesMenu;