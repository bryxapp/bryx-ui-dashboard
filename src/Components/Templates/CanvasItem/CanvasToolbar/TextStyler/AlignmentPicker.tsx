import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj } from '../../../../../utils/types/CanvasInterfaces';

interface AlignmentPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const AlignmentPicker: React.FC<AlignmentPickerProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment) {
            const updatedCanvasDesign = {
                ...canvasDesign,
                Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                    if (shape.id === canvasDesign.selectedId) {
                        return {
                            ...shape,
                            align: newAlignment,
                        };
                    }
                    return shape;
                }),
            };
            setCanvasDesign(updatedCanvasDesign);
        }
    };

    const selectedTextAlignment = canvasDesign.Shapes.find((shape: ShapeObj): shape is TextInputObj | TextFieldObj => shape.id === canvasDesign.selectedId)?.align;

    return (
        <ToggleButtonGroup
            value={selectedTextAlignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="text alignment"
            style={{ marginBottom: '1rem', margin: 10 }}
        >
            <ToggleButton key={'left'} value={'left'}>
                <AlignLeftIcon />
            </ToggleButton>
            <ToggleButton key={'center'} value={'center'}>
                <AlignCenterIcon />
            </ToggleButton>
            <ToggleButton key={'right'} value={'right'}>
                <AlignRightIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default AlignmentPicker;
