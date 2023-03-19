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

export interface textInputObj {
    id: string;
    displayName: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
    fontSize: number;
    fill: string;
}

export interface textFieldObj {
    id: string;
    value: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
    fontSize: number;
    fill: string;
}
