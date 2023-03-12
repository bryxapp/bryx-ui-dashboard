import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { textObj } from "../../../../../../Utils/types/ShapeInterfaces";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import { TemplateCreationState } from "../../../../../../Utils/types/TemplateCreationInterfaces";
import { Box, Button, MenuItem, Popover, Select, Typography } from "@mui/material";

interface TextCustomizerProps {
    textInput: textObj;
    canvasDesign: TemplateCreationState;
    setCanvasDesign: React.Dispatch<React.SetStateAction<TemplateCreationState>>;
}

const TextCustomizer = (props: TextCustomizerProps) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleFontSizeChange = (event: any, textInputId: string) => {
        const updatedCanvasDesign = {
            ...props.canvasDesign,
            TextInputs: props.canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === textInputId) {
                    return {
                        ...textInput,
                        fontSize: event.target.value,
                    };
                } else {
                    return textInput;
                }
            }),
        };
        props.setCanvasDesign(updatedCanvasDesign);
    };

    const handleColorChange = (color: ColorResult, textInputId: string) => {
        const updatedCanvasDesign = {
            ...props.canvasDesign,
            TextInputs: props.canvasDesign.TextInputs.map((textInput: any) => {
                if (textInput.id === textInputId) {
                    return {
                        ...textInput,
                        fontColor: color.hex,
                    };
                } else {
                    return textInput;
                }
            }),
        };
        props.setCanvasDesign(updatedCanvasDesign);
    };

    const handleDelete = (textInputId: string) => {
        const updatedCanvasDesign = {
            ...props.canvasDesign,
            TextInputs: props.canvasDesign.TextInputs.filter((textInput: any) => textInput.id !== textInputId),
        };
        props.setCanvasDesign(updatedCanvasDesign);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{ marginLeft: "0.5rem", height: "3.5rem" }}
                variant="outlined"
            >
                <TextFormatIcon />
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box p={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6">Font Size</Typography>
                    <Select
                        id={`${props.textInput.id}-size`}
                        value={props.textInput.fontSize}
                        onChange={(event) => handleFontSizeChange(event, props.textInput.id)}
                        variant="outlined"
                        style={{ marginBottom: "1rem" }}
                    >
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={28}>28</MenuItem>
                    </Select>
                    <Typography variant="h6">Font Color</Typography>
                    <ChromePicker
                        color={props.textInput.fontColor}
                        onChange={(color: ColorResult) => handleColorChange(color, props.textInput.id)}
                        disableAlpha
                    />
                    <Button onClick={() => handleDelete(props.textInput.id)} variant="outlined" sx={{ marginTop: "1rem" }}>
                        Delete
                    </Button>
                </Box>
            </Popover>
        </>
    )
};

export default TextCustomizer;
