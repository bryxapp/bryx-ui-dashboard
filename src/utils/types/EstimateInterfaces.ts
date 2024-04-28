import { InputType } from "./CanvasInterfaces";
import { BrandingInfo } from "./OrganizationInterfaces";

export interface EstimateData {
    user: string;
    templateId: string;
    estimateName: string;
    estimatePdfUrl: string;
    estimateImgObj: string;
    createdDate: string;
    orgId: string|null;
    _ts: number;
    id: string;
    orgDisplayName?: string;
    branding? : BrandingInfo
};

export interface EstimateDraftData {
    user: string,
    templateId: string,
    estimateName: string,
    _ts: number,
    id: string,
    formInputs: EstimateFormFields
    createdDate: string;
}

export interface EstimateFormFields {
    [inputObjId: string]: EstimateFormField
}

export interface EstimateFormField {
    inputObjId: string;
    type: InputType | 'CellInput';
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