import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 48, 64, 72];
const FONT_STYLES = ['normal', 'italic', 'bold'];
const TEXT_DECORATIONS = ['none', 'underline', 'line-through'];

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

    const handleFontFamilyChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontFamily: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontFamily: event.target.value as string,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleFontStyleChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        fontStyle: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        fontStyle: event.target.value as string,
                    };
                }
                return textField;
            }),
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleTextDecorationChange = (event: any) => {
        const updatedCanvasDesign = {
            ...canvasDesign,
            TextInputs: canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === selectedId) {
                    return {
                        ...textInput,
                        textDecoration: event.target.value as string,
                    };
                }
                return textInput;
            }),
            TextFields: canvasDesign.TextFields.map((textField: any) => {
                if (textField.id === selectedId) {
                    return {
                        ...textField,
                        textDecoration: event.target.value as string,
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

    const selectedTextItemFontFamily = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.fontFamily || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.fontFamily;

    const selectedTextItemFontStyle = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.fontStyle || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.fontStyle;

    const selectedTextItemTextDecoration = canvasDesign.TextInputs.find(
        (textInput: any) => textInput.id === selectedId
    )?.textDecoration || canvasDesign.TextFields.find(
        (textField: any) => textField.id === selectedId
    )?.textDecoration;

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
                <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
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
                <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                    Font Family
                </Typography>
                <Select
                    value={selectedTextItemFontFamily || ''}
                    onChange={handleFontFamilyChange}
                    variant="outlined"
                    style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
                >
                    {['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'].map((fontFamily) => (
                        <MenuItem key={fontFamily} value={fontFamily}>
                            {fontFamily}
                        </MenuItem>
                    ))}
                </Select>
                <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                    Font Style
                </Typography>
                <Select
                    value={selectedTextItemFontStyle || ''}
                    onChange={handleFontStyleChange}
                    variant="outlined"
                    style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
                >
                    {FONT_STYLES.map((fontStyle) => (
                        <MenuItem key={fontStyle} value={fontStyle}>
                            {fontStyle}
                        </MenuItem>
                    ))}
                </Select>
                <Typography variant="body2" sx={{ paddingLeft: 2, paddingTop: 1 }}>
                    Text Decoration
                </Typography>
                <Select
                    value={selectedTextItemTextDecoration || ''}
                    onChange={handleTextDecorationChange}
                    variant="outlined"
                    style={{ marginBottom: '1rem', minWidth: '10rem', margin: 10 }}
                >
                    {TEXT_DECORATIONS.map((textDecoration) => (
                        <MenuItem key={textDecoration} value={textDecoration}>
                            {textDecoration}
                        </MenuItem>
                    ))}
                </Select>
            </Menu>
        </>
    );
}

export default TextStyler;