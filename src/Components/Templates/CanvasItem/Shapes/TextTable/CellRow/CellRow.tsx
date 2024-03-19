import { TableCellObj, TextTableObj, CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import Cell from './Cell/Cell'; // Assuming you have a Cell component

interface CellRowProps {
    row: TableCellObj[];
    rowIndex: number;
    textTableObj: TextTableObj;
    handleSelect: any;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
}

const CellRow = ({ row, rowIndex, textTableObj, handleSelect, canvasDesign, setCanvasDesign }: CellRowProps) => {
    return (
        <>
            {row.map((cell, cellIndex) => (
                <Cell
                    key={`${rowIndex}-${cellIndex}`}
                    cell={cell}
                    cellIndex={cellIndex}
                    row={row}
                    rowIndex={rowIndex}
                    textTableObj={textTableObj}
                    handleSelect={handleSelect}
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                />
            ))}
        </>
    );
};

export default CellRow;
