import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import DisplayNameEditor from './DisplayNameEditor'
import FontSizePicker from './FontSizePicker'
import FontFamilyPicker from './FontFamilyPicker'
import FontStylePicker from './FontStylePicker'
import FontDecorationPicker from './FontDecorationPicker'
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';

interface TextStylerProps {
    isLoading: boolean;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
    selectedId: string | null;
}

function TextStyler({ isLoading, canvasDesign, setCanvasDesign, selectedId }: TextStylerProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //Check if there is a selected textInput or textField
    const isTextObject = canvasDesign.TextInputs.find((textInput) => textInput.id === selectedId)
        || canvasDesign.TextFields.find((textField) => textField.id === selectedId);

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
                <DisplayNameEditor canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                <FontFamilyPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                <FontSizePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FontStylePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                    <FontDecorationPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                </div>
            </Menu>
        </>
    );
}

export default TextStyler;
