import TemplatesDropdown from "./TemplatesDropdown/TemplatesDropdown";
import EstimatesSearchInput from "./EstimatesSearchInput.tsx/EstimatesSearchInput";

interface PastEstimatesSearchProps {
    disabled: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    selectedTemplateId: string;
    setSelectedTemplateId: (templateId: string) => void;
}

const PastEstimatesSearch = ({ disabled, searchTerm, setSearchTerm, selectedTemplateId, setSelectedTemplateId }: PastEstimatesSearchProps) => {

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <EstimatesSearchInput disabled={disabled} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TemplatesDropdown disabled={disabled} selectedTemplateId={selectedTemplateId} setSelectedTemplateId={setSelectedTemplateId} />
        </div>
    );
};

export default PastEstimatesSearch;