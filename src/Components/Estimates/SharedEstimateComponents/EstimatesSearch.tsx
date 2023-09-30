import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { EstimateTemplateUsedData } from "../../../utils/types/TemplateInterfaces";
import { useTheme } from "@mui/material";
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { getUsedTemplates } from "../../../utils/api/estimates-api";

interface EstimatesSearchProps {
    enabled: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    selectedTemplateId: string;
    setSelectedTemplateId: (templateId: string) => void;
}

const EstimatesSearch = ({ enabled, searchTerm, setSearchTerm, selectedTemplateId, setSelectedTemplateId }: EstimatesSearchProps) => {

    const theme = useTheme();
    const { getAccessToken } = useAccessToken();
    const [templatesUsed, setTemplatesUsed] = useState<EstimateTemplateUsedData[]>([]);
    const [templateRequestCompleted, setTemplateRequestCompleted] = useState(false);
    const [errorRetrievingTemplates, setErrorRetrievingTemplates] = useState(false);


    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleTemplateIdFilter = (event: any) => {
        setSelectedTemplateId(event.target.value);
    };

    useEffect(() => {
        const fetchUsedTemplates = async () => {
            setTemplateRequestCompleted(false);
            setErrorRetrievingTemplates(false);  // Reset the error state at the start
            const token = await getAccessToken();
            if (!token) return;
            try {
                const response = await getUsedTemplates(token);
                setTemplatesUsed(response.data);
            }
            catch (error) {
                setErrorRetrievingTemplates(true);
                console.error('Error retrieving templates:', error);
            }
            finally {
                setTemplateRequestCompleted(true);
            }
        };
        fetchUsedTemplates();
    }, [getAccessToken]);



    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: "1" }}>
                <TextField
                    id="outlined-search"
                    disabled={!enabled}
                    label="Search Estimates"
                    type="search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "100%" }} // make search box wider
                    InputLabelProps={{
                        style: { color: enabled ? theme.palette.text.primary : theme.palette.text.secondary } // change the color to your desired color
                    }}
                />
            </div>
            <div style={{ paddingLeft: "16px" }}> {/* add padding */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel
                        id="templateId-label"
                        sx={{ color: enabled ? theme.palette.text.primary : theme.palette.text.secondary }}>
                        Template ID
                    </InputLabel>
                    <Select
                        disabled={!enabled}
                        labelId="templateId-label"
                        id="templateId"
                        value={selectedTemplateId}
                        onChange={handleTemplateIdFilter}
                        label="Template ID"
                        style={{
                            width: "10em",
                            color: enabled ? theme.palette.text.primary : theme.palette.text.secondary
                        }}
                    >

                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {!templateRequestCompleted && (
                            <MenuItem value="" disabled>
                                Loading...
                            </MenuItem>
                        )}
                        {errorRetrievingTemplates ? (
                            <MenuItem value="" disabled>
                                Error loading templates
                            </MenuItem>
                        ) : (
                            templatesUsed.map(({ id, friendlyName }) => (
                                <MenuItem key={id} value={id}>
                                    {friendlyName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default EstimatesSearch;