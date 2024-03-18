import Konva from 'konva';
import { TextInputObj, TextFieldObj, TableCellObj, CanvasDesignData, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import TextField from '../TextField';
import TextInput from '../TextInput';
import { Rect } from 'react-konva';

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

    const handleRectClick = (e: any) => {
        handleSelect(cell.id, 'item', e);
    }

    const createTempTextKonvaShape = (content: TextInputObj | TextFieldObj | null) => {
        if (!content) return new Konva.Text({
            text: '',
            fontSize: 0,
            fontFamily: '',
            fontStyle: '',
            textDecoration: '',
            align: '',
        });

        return new Konva.Text({
            text: 'displayName' in content ? content.displayName : content.value,
            fontSize: content.fontSize,
            fontFamily: content.fontFamily,
            fontStyle: content.fontStyle,
            textDecoration: content.textDecoration,
            align: content.align,
        });
    }

    // Calculate the X and Y position of the cell shape    
    const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
    const cellYPosition = textTableObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);

    //Create a temporary Konva Text shape to calculate the width and height of the content
    const tempText = createTempTextKonvaShape(cell.content);
    const contentWidth = tempText.width();
    const contentHeight = tempText.height();

    // Adjust the X and Y position of the content based on the cell's alignment
    let contentX = cellXPosition + 5; // Add some padding
    let contentY = cellYPosition + 5; // Add some padding

    // Adjust Y based on vertical alignment
    if (cell.verticalAlign === 'middle') {
        // Adjust Y position to center the content by placing half of the remaining space above and below the content
        contentY += (cell.height - contentHeight) / 2;
    } else if (cell.verticalAlign === 'bottom') {
        // Adjust Y position to place the content at the bottom of the cell
        contentY += cell.height - contentHeight;
        //Add some padding 
        contentY -= 5;
    }

    // Adjust X based on horizontal alignment
    if (cell.horizontalAlign === 'center') {
        // Adjust X position to center the content by placing half of the remaining space to the left and right of the content
        contentX += (cell.width - contentWidth) / 2;
    } else if (cell.horizontalAlign === 'right') {
        // Adjust X position to place the content at the right of the cell
        contentX += cell.width - contentWidth;
        //Add some padding
        contentX -= 5;
    }

    if (cell.content?.type === 'TextInput') {
        let textInput = cell.content as TextInputObj;
        return (
            <>
                <Rect
                    x={cellXPosition + 5}
                    y={cellYPosition + 5}
                    width={cell.width - 10}
                    height={cell.height - 10}
                    fill='transparent'
                    onClick={handleRectClick}
                />
                <TextInput
                    key={`${rowIndex}-${cellIndex}`}
                    textInputObj={{ ...textInput, x: contentX, y: contentY }} // Adjusted Y position
                    handleDragStart={() => { }}
                    handleDragMove={() => { }}
                    handleDragEnd={() => { }}
                    isSelected={textInput.id === canvasDesign.selectedId}
                    onSelect={(e: any) => handleSelect(cell.id, 'item', e)}
                    onTransformEnd={() => { }}
                    draggable={false}
                />
            </>
        );
    }
    else if (cell.content?.type === 'TextField') {
        let textField = cell.content as TextFieldObj;
        return (
            <>
                <Rect
                    x={cellXPosition + 5}
                    y={cellYPosition + 5}
                    width={cell.width - 10}
                    height={cell.height - 10}
                    fill='transparent'
                    onClick={handleRectClick}
                />
                <TextField
                    key={`${rowIndex}-${cellIndex}`}
                    textFieldObj={{ ...textField, x: contentX, y: contentY }} // Adjusted Y position
                    handleDragStart={() => { }}
                    handleDragEnd={() => { }}
                    handleDragMove={() => { }}
                    isSelected={textField.id === canvasDesign.selectedId}
                    onSelect={(e: any) => handleSelect(cell.id, 'item', e)}
                    onTransformEnd={() => { }}
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                    draggable={false}
                />
            </>
        );
    }
    else {
        return (
            <>
                <Rect
                    x={cellXPosition + 5}
                    y={cellYPosition + 5}
                    width={cell.width - 10}
                    height={cell.height - 10}
                    fill='transparent'
                    onClick={handleRectClick}
                />
            </>)
    }
}

export default Cell;
