export interface rectangleObj {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isDragging: boolean;
    fill: string;
    rotation: number;
}

export interface circleObj {
    id: string;
    x: number;
    y: number;
    radius: number;
    isDragging: boolean;
    fill: string;
    rotation: number;
}

export interface lineObj {
    id: string;
    x: number;
    y: number;
    points: number[];
    isDragging: boolean;
    stroke: string;
    strokeWidth: number;
    rotation: number;
}

export interface textObj {
    id: string;
    displayName: string;
    x: number;
    y: number;
    isDragging: boolean;
    fontSize: number;
    fontColor: string;
}