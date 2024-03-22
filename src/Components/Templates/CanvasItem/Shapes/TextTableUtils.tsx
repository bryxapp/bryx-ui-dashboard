import { Rect } from 'react-konva';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../utils/types/CanvasInterfaces';

const updateColumnWidth = (
    columnIndex: number,
    delta: number,
    textTableObj: TextTableObj,
    canvasDesign: CanvasDesignData,
    setCanvasDesign: any) => {
    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        if (shape.id === textTableObj.id) {
            const newTableObj = JSON.parse(JSON.stringify(shape)) as TextTableObj;
            newTableObj.rows.forEach(row => {
                if (row[columnIndex]) {
                    row[columnIndex].width += delta;
                }
            });
            return newTableObj;
        }
        return shape;
    });

    setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
};

const updateRowHeight = (
    rowIndex: number,
    delta: number,
    textTableObj: TextTableObj,
    canvasDesign: CanvasDesignData,
    setCanvasDesign: any) => {
    const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
        if (shape.id === textTableObj.id) {
            const newTableObj = JSON.parse(JSON.stringify(shape)) as TextTableObj;
            newTableObj.rows[rowIndex].forEach(cell => {
                cell.height += delta;
            });
            return newTableObj;
        }
        return shape;
    });

    setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
};

export const changeCursor = (cursorStyle: string, shapeRef: any) => {
    const stage = shapeRef.current?.getStage();
    if (stage) {
        const container = stage.container();
        container.style.cursor = cursorStyle;
    }
};


export const addColumnResizeHandles = (textTableObj: TextTableObj,
    tableHeight: number,
    shapeRef: any,
    canvasDesign: CanvasDesignData,
    setCanvasDesign: any,
    handleSelect: any) => {
    const handles = [];
    let accumulatedWidth = 0;

    for (let i = 0; i < textTableObj.rows[0].length; i++) { // Exclude the last column
        accumulatedWidth += textTableObj.rows[0][i].width;

        const handleX = accumulatedWidth; // Position at the end of the column
        handles.push(
            <Rect
                key={`resize-handle-${i}`}
                x={handleX}
                y={0} // Adjust based on your needs
                width={6}
                height={tableHeight}
                fill="transparent"
                draggable
                onDragMove={(e) => {
                    const delta = e.target.x() - handleX;
                    updateColumnWidth(i, delta, textTableObj, canvasDesign, setCanvasDesign); // Implement this function to update column width
                }}
                onDragEnd={(e) => {
                    e.target.x(handleX);
                }}
                dragBoundFunc={(pos) => {
                    // Prevent the handle from being dragged outside the table
                    return {
                        x: pos.x,
                        y: textTableObj.y
                    };
                }}
                onMouseEnter={() => changeCursor('col-resize', shapeRef)} // Use 'ew-resize' or 'col-resize' for horizontal resizing
                onMouseLeave={() => changeCursor('default', shapeRef)}
                onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
            />
        );
    }

    return handles;
};

export const addRowResizeHandles = (
    textTableObj: TextTableObj,
    tableWidth: number,
    shapeRef: any,
    canvasDesign: CanvasDesignData,
    setCanvasDesign: any,
    handleSelect: any) => {
    const handles = [];
    let accumulatedHeight = 0;

    for (let i = 0; i < textTableObj.rows.length; i++) { // Exclude the last row
        accumulatedHeight += textTableObj.rows[i][0].height;

        const handleY = accumulatedHeight; // Position at the end of the row
        handles.push(
            <Rect
                key={`resize-handle-${i}`}
                x={0} // Adjust based on your needs
                y={handleY}
                width={tableWidth}
                height={6}
                fill="transparent"
                draggable
                onDragMove={(e) => {
                    const delta = e.target.y() - handleY;
                    updateRowHeight(i, delta, textTableObj, canvasDesign, setCanvasDesign); // Implement this function to update row height
                }}
                onDragEnd={(e) => {
                    // Optionally, adjust the handle position after dragging
                    e.target.y(handleY);
                }}
                dragBoundFunc={(pos) => {
                    // Prevent the handle from being dragged outside the table
                    return {
                        x: textTableObj.x,
                        y: pos.y
                    };
                }}
                onMouseEnter={() => changeCursor('row-resize', shapeRef)}
                onMouseLeave={() => changeCursor('default', shapeRef)}
                onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
            />
        );
    }

    return handles;
}

export const drawBorders = (textTableObj: TextTableObj, isSelected: boolean = false) => {
    let strokeWidth = 0;
    let strokeColor = 'transparent';
    if (textTableObj.border) {
        strokeWidth = textTableObj.border.width;
        strokeColor = textTableObj.border.color;
    }
    if (isSelected) {
        strokeWidth = textTableObj?.border?.width ? textTableObj.border.width + 1 : 1;
        strokeColor = '#00a2ff';
    }

    const bordersProps = [];
    const tableWidth = textTableObj.rows[0].reduce((acc, cell) => acc + cell.width, 0);
    const tableHeight = textTableObj.rows.reduce((acc, row) => acc + row[0].height, 0);

    // Vertical lines
    for (let i = 1; i < textTableObj.rows[0].length; i++) {
        // Calculate the X position of the vertical line after each column
        const xPos = textTableObj.rows[0].slice(0, i).reduce((acc, cell) => acc + cell.width, 0);
        bordersProps.push({
            key: `v-${i}`,
            points: [xPos, 0, xPos, tableHeight],
            stroke: strokeColor,
            strokeWidth: strokeWidth
        });
    }

    // Horizontal lines
    let accumulatedHeight = 0; // Keep track of the accumulated heights for accurate line positioning
    for (let i = 1; i < textTableObj.rows.length; i++) {
        accumulatedHeight += textTableObj.rows[i - 1][0].height;
        bordersProps.push({
            key: `h-${i}`,
            points: [0, accumulatedHeight, tableWidth, accumulatedHeight],
            stroke: strokeColor,
            strokeWidth: strokeWidth,
        });
    }

    return bordersProps;
};