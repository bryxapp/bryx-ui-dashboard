const pageWidth = 8.5; //Standard sheet of paper width
const pageHeight = 11; //Standard sheet of paper height

export const getWebCanvasWidth = () => {
    //multiplier to display canvas while designing canvas
    return pageWidth * 96
}

export const getWebCanvasHeight = () => {
    //multiplier to display canvas while designing canvas
    return pageHeight * 96
}

export const getPDFWidth = () => {
    //multiplier to for PDF conversion call to API
    return pageWidth * 72;
}

export const getPDFHeight = () => {
    //multiplier to for PDF conversion call to API
    return pageHeight * 72;
}