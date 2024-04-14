import { CanvasDesignData, InputType } from "./CanvasInterfaces";

export interface EstimateData {
    user: string;
    templateId: string;
    estimateName: string;
    estimatePdfUrl: string;
    canvasDesign: CanvasDesignData;
    formInputs: EstimateFormFields;
    _ts: number;
    id: string;
};

export interface EstimateDraftData {
    user: string,
    templateId: string,
    estimateName: string,
    _ts: number,
    id: string,
    formInputs: EstimateFormFields
}

export interface EstimateFormFields {
    [inputObjId: string]: EstimateFormField
}

export interface EstimateFormField {
    inputObjId: string;
    type: InputType;
    value: string;
}

export interface EstimateResponse {
    estimates: EstimateData[];
    maxEstimatesReached: boolean;
}

export interface EstimateCommentData {
    userName: string;
    userPic: string;
    estimateId: string;
    comment: string;
    userId: string;
    id: string;
    _ts: number;
}