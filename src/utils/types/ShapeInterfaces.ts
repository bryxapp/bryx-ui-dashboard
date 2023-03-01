export interface rectangleObj {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isDragging: boolean;
    fill: string;
}

export interface circleObj {
    id: string;
    x: number;
    y: number;
    radius: number;
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