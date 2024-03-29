import { CanvasDesignData } from './CanvasInterfaces';

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: CanvasDesignData;
    id: string;
    _ts: number;
};

export interface EstimateTemplateUsedData {
    templateId: string;
    templateFriendlyName: string;
};

export interface TemplateResponse {
    templates: TemplateData[];
    maxTemplatesReached: boolean;
}
