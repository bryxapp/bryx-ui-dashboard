import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { EstimateTemplateUsedData } from "../../../../utils/types/TemplateInterfaces";
import { useTheme } from "@mui/material";
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { getUsedTemplates } from "../../../../utils/api/estimates-api";

interface PastEstimatesSearchProps {
    disabled: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    selectedTemplateId: string;
    setSelectedTemplateId: (templateId: string) => void;
}

const PastEstimatesSearch = ({ disabled, searchTerm, setSearchTerm, selectedTemplateId, setSelectedTemplateId }: PastEstimatesSearchProps) => {

    const theme = useTheme();
    const { auth0User, getAccessToken } = useAuth0User();
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
                const fetchedTemplates = await getUsedTemplates(token);
                setTemplatesUsed(fetchedTemplates);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);



    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: "1" }}>
                <TextField
                    id="outlined-search"
                    disabled={disabled}
                    label="Search Estimates"
                    type="search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "100%" }} // make search box wider
                    InputLabelProps={{
                        style: { color: !disabled ? theme.palette.text.primary : theme.palette.text.secondary } // change the color to your desired color
                    }}
                />
            </div>
            <div style={{ paddingLeft: "16px" }}> {/* add padding */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel
                        id="templateId-label"
                        sx={{ color: !disabled ? theme.palette.text.primary : theme.palette.text.secondary }}>
                        Template ID
                    </InputLabel>
                    <Select
                        disabled={disabled}
                        labelId="templateId-label"
                        id="templateId"
                        value={selectedTemplateId}
                        onChange={handleTemplateIdFilter}
                        label="Template ID"
                        style={{
                            width: "10em",
                            color: !disabled ? theme.palette.text.primary : theme.palette.text.secondary
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
                            templatesUsed.map(({ templateId, templateFriendlyName }) => (
                                <MenuItem key={templateId} value={templateId}>
                                    {templateFriendlyName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default PastEstimatesSearch;