const pageWidth = 8.5; //Standard sheet of paper width
const pageHeight = 11; //Standard sheet of paper height
const canvasMultiplier = 96;
const pdfMultiplier = 72;
export const getWebCanvasWidth = () => {
    //multiplier to display canvas while designing canvas
    return pageWidth * canvasMultiplier;
}

export const getWebCanvasHeight = () => {
    //multiplier to display canvas while designing canvas
    return pageHeight * canvasMultiplier;
}

export const getPDFWidth = () => {
    //multiplier to for PDF conversion call to API
    return pageWidth * pdfMultiplier;
}

export const getPDFHeight = () => {
    //multiplier to for PDF conversion call to API
    return pageHeight * pdfMultiplier;
}