import { CanvasDesignData, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape, updateShapeProperty } from '../../../../../utils/canvas-util';
import { TextField, Typography } from '@mui/material';

interface AddColProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const CellSize: React.FC<AddColProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleCellWidthChange = (event: any) => {
        const val = parseInt(event.target.value);
        updateShapeProperty(canvasDesign, setCanvasDesign, 'cellWidth', val, canvasDesign.selectedId)
    };

    const handleCellHeightChange = (event: any) => {
        const val = parseInt(event.target.value);
        updateShapeProperty(canvasDesign, setCanvasDesign, 'cellHeight', val, canvasDesign.selectedId)
    };

    const shape = findShape(canvasDesign, canvasDesign.selectedId) as TextTableObj;
    const selectedTextTableCellWidth = shape?.cellWidth ?? 200;
    const selectedTextTableCellHeight = shape?.cellHeight ?? 40;


    return (
        <>
            <Typography variant="body1" >
                Cell Width
            </Typography>
            <TextField
                id={'cellWidthEditor'}
                value={selectedTextTableCellWidth}
                onChange={(event) => handleCellWidthChange(event)}
                variant="outlined"
                style={{ marginBottom: '1rem', margin: 10, minWidth: '7rem' }}
                size='small'
                type='number'
            />
            <Typography variant="body1" >
                Cell Height
            </Typography>
            <TextField
                id={'cellHeightEditor'}
                value={selectedTextTableCellHeight}
                onChange={(event) => handleCellHeightChange(event)}
                variant="outlined"
                style={{ marginBottom: '1rem', margin: 10, minWidth: '7rem' }}
                size='small'
                type='number'
            />
        </>
    );
};

export default CellSize;
