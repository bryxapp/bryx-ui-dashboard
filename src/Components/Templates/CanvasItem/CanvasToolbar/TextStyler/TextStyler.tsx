import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];

interface TextStylerProps {
    isLoading: boolean;
    canvasDesign: any;
    setCanvasDesign: any;
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

    const handleFontSizeChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontSize: event.target.value as number,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontSize: event.target.value as number,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const selectedTextItemFontSize = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.fontSize || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.fontSize;

    return (
        <>
            <Tooltip title="Change Text Style" placement="bottom">
                <IconButton
                    id="font-size-selector"
                    aria-controls="font-size-selector-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpen}
                    color="inherit"
                    disabled={isLoading || !selectedId}
                >
                    <FontSizeSelectorIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="font-size-selector-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'font-size-selector',
                }}
            >
                <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1, }}>
                    Font Size
                </Typography>
                <Select
                    value={selectedTextItemFontSize || ''}
                    onChange={handleFontSizeChange}
                    variant="outlined"
                    style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
                >
                    {FONT_SIZES.map((fontSize) => (
                        <MenuItem key={fontSize} value={fontSize}>
                            {fontSize}
                        </MenuItem>
                    ))}
                </Select>
            </Menu>
        </>
    );
}

export default TextStyler;
