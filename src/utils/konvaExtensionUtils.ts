import { TextTableObj } from "./types/CanvasInterfaces";

export const drawBorders = (textTableObj: TextTableObj) => {
    if (!textTableObj.border) return [];
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
            stroke: textTableObj.border.color,
            strokeWidth: textTableObj.border.width
        });
    }

    // Horizontal lines
    let accumulatedHeight = 0; // Keep track of the accumulated heights for accurate line positioning
    for (let i = 1; i < textTableObj.rows.length; i++) {
        accumulatedHeight += textTableObj.rows[i - 1][0].height;
        bordersProps.push({
            key: `h-${i}`,
            points: [0, accumulatedHeight, tableWidth, accumulatedHeight],
            stroke: textTableObj.border.color,
            strokeWidth: textTableObj.border.width,
        });
    }

    return bordersProps;
};
