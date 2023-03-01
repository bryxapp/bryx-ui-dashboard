export interface rectangleObj {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    text?: string;
    isDragging: boolean;
    fill: string;
}

export interface textObj {
    id: string;
    x: number;
    y: number;
    isDragging: boolean;
    fontSize: number;
}