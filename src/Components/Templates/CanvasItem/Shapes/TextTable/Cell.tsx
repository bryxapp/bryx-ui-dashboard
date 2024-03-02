import { TextInputObj, TextFieldObj, TableCellObj, CanvasDesignData, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import TextField from '../TextField';
import TextInput from '../TextInput';

interface CellProps {
    cell: TableCellObj;
    cellIndex: number;
    row: TableCellObj[];
    rowIndex: number;
    textTableObj: TextTableObj;
    handleSelect: any;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
}

const Cell = ({ cell, row, rowIndex, cellIndex, textTableObj, handleSelect, canvasDesign, setCanvasDesign }: CellProps) => {
    const cellX = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
    const cellY = textTableObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);
    const cellHeight = cell.height;
    const verticalAlign = cell.verticalAlign;
    let contentY = cellY; // Default to top alignment

    const contentHeight = cell.content?.type === 'TextInput' ? (cell.content as TextInputObj).fontSize : (cell.content as TextFieldObj).fontSize;

    // Adjust Y based on vertical alignment
    if (verticalAlign === 'middle') {
        contentY += (cellHeight - contentHeight) / 2;
    } else if (verticalAlign === 'bottom') {
        contentY += cellHeight - contentHeight;
    }
    // For 'top' alignment, contentY remains as cellY

    if (cell.content?.type === 'TextInput') {
        let textInput = cell.content as TextInputObj;
        return (
            <TextInput
                key={`${rowIndex}-${cellIndex}`}
                textInputObj={{ ...textInput, x: cellX, y: contentY }} // Adjusted Y position
                handleDragStart={() => { }}
                handleDragMove={() => { }}
                handleDragEnd={() => { }}
                isSelected={textInput.id === canvasDesign.selectedId}
                onSelect={(e: any) => handleSelect(textInput.id, 'item', e)}
                onTransformEnd={() => { }}
                draggable={false}
            />
        );
    } else {
        let textField = cell.content as TextFieldObj;
        return (
            <TextField
                key={`${rowIndex}-${cellIndex}`}
                textFieldObj={{ ...textField, x: cellX, y: contentY }} // Adjusted Y position
                handleDragStart={() => { }}
                handleDragEnd={() => { }}
                handleDragMove={() => { }}
                isSelected={textField.id === canvasDesign.selectedId}
                onSelect={(e: any) => handleSelect(textField.id, 'item', e)}
                onTransformEnd={() => { }}
                canvasDesign={canvasDesign}
                setCanvasDesign={setCanvasDesign}
                draggable={false}
            />
        );
    }
}

export default Cell;
