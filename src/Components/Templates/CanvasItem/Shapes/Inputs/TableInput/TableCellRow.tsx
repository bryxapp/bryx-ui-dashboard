import { TableCellObj, TableInputObj, CanvasDesignData } from '../../../../../../utils/types/CanvasInterfaces';
import TableCell from './TableCell';

interface CellRowProps {
    row: TableCellObj[];
    rowIndex: number;
    tableInputObj: TableInputObj;
    handleSelect: any;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
}

const TableCellRow = ({ row, rowIndex, tableInputObj, handleSelect, canvasDesign, setCanvasDesign }: CellRowProps) => {
    return (
        <>
            {row.map((cell, cellIndex) => (
                <TableCell
                    key={`${rowIndex}-${cellIndex}`}
                    cell={cell}
                    cellIndex={cellIndex}
                    row={row}
                    rowIndex={rowIndex}
                    tableInputObj={tableInputObj}
                    handleSelect={handleSelect}
                />
            ))}
        </>
    );
};

export default TableCellRow;