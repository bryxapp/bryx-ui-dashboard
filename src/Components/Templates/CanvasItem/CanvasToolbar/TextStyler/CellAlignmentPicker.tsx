import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AlignTopIcon from '@mui/icons-material/AlignVerticalTop';
import AlignMiddleIcon from '@mui/icons-material/AlignVerticalCenter';
import AlignBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { CanvasDesignData, TableCellObj } from '../../../../../utils/types/CanvasInterfaces';
import { findCell, updateCellProperty } from '../../../../../utils/shapeManagementUtils';

interface CellAlignmentPickerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const CellAlignmentPicker: React.FC<CellAlignmentPickerProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleHorizontalAlignmentChange = (event: React.MouseEvent<HTMLElement>, newHorizontalAlignment: string) => {
        if (newHorizontalAlignment) {
            updateCellProperty(canvasDesign, setCanvasDesign, 'horizontalAlign', newHorizontalAlignment, canvasDesign.selectedId)
        }
    };

    const handleVerticalAlignmentChange = (event: React.MouseEvent<HTMLElement>, newVerticalAlignment: string) => {
        if (newVerticalAlignment) {
            updateCellProperty(canvasDesign, setCanvasDesign, 'verticalAlign', newVerticalAlignment, canvasDesign.selectedId)
        }
    };

    const selectedShape = findCell(canvasDesign, canvasDesign.selectedId) as TableCellObj;
    if (!selectedShape.content) return null;
    const selectedHorizontalAlignment = selectedShape?.horizontalAlign;
    const selectedVerticalAlignment = selectedShape?.verticalAlign;

    return (
        <>
            <ToggleButtonGroup
                value={selectedHorizontalAlignment}
                exclusive
                onChange={handleHorizontalAlignmentChange}
                aria-label="horizontal cell alignment"
                style={{ marginBottom: '1rem', margin: 10 }}
                size="small"
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
            <ToggleButtonGroup
                value={selectedVerticalAlignment}
                exclusive
                onChange={handleVerticalAlignmentChange}
                aria-label="vertical cell alignment"
                style={{ marginBottom: '1rem', margin: 10 }}
                size="small"
            >
                <ToggleButton key={'top'} value={'top'}>
                    <AlignTopIcon />
                </ToggleButton>
                <ToggleButton key={'middle'} value={'middle'}>
                    <AlignMiddleIcon />
                </ToggleButton>
                <ToggleButton key={'bottom'} value={'bottom'}>
                    <AlignBottomIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
};

export default CellAlignmentPicker;
