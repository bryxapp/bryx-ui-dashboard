import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import { AppBar } from '@mui/material';
import { findShape } from '../../../../../utils/canvas-util';
import AddRow from './AddRow';
import AddCol from './AddCol';
import RemoveRow from './RemoveRow';
import RemoveCol from './RemoveCol';
import TableBorderControl from './TableBorderControl';

interface TableEditorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TableEditor({ canvasDesign, setCanvasDesign }: TableEditorProps) {
    if (findShape(canvasDesign, canvasDesign.selectedId)?.type !== "TextTable") return null;

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <AddRow canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <RemoveRow canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <AddCol canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <RemoveCol canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <TableBorderControl canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </AppBar>
    );
}

export default TableEditor;
