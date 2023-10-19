export interface EstimateData {
    user: string;
    templateId: string;
    estimateName: string;
    estimatePdfUrl: string
    _ts: number;
    id: string;
};

export interface EstimateDraftData {
    user: string,
    templateId: string,
    estimateName: string,
    _ts: number,
    id: string,
    filledFields: EstimateFormFields
}

export interface EstimateFormFields {
    [key: string]: string;
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