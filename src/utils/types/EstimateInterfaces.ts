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
}

export interface EstimateFormFields {
    [key: string]: string;
}