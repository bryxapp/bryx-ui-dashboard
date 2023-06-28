import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import { TemplateData } from "../../../utils/types/TemplateInterfaces";
import { useTheme } from "@mui/material";

interface EstimatesSearchProps {
    estimates: EstimateData[];
    templates: TemplateData[];
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    selectedTemplateId: string;
    setSelectedTemplateId: (templateId: string) => void;
}

const EstimatesSearch = ({ estimates, templates, searchTerm, setSearchTerm, selectedTemplateId, setSelectedTemplateId }: EstimatesSearchProps) => {

    const theme = useTheme();

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleTemplateIdFilter = (event: any) => {
        setSelectedTemplateId(event.target.value);
    };

    const uniqueTemplateIds = new Set(estimates.map(({ templateId }) => String(templateId)));
    const filteredTemplates = templates.filter(({ id }) => uniqueTemplateIds.has(String(id)?.toString()));
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: "1" }}>
                <TextField
                    id="outlined-search"
                    label="Search Estimates"
                    type="search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "100%" }} // make search box wider
                    InputLabelProps={{
                        style: { color: theme.palette.secondary.main } // change the color to your desired color
                    }}
                />
            </div>
            <div style={{ paddingLeft: "16px" }}> {/* add padding */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="templateId-label" sx={{
                        color: theme.palette.secondary.main
                    }}>Template ID</InputLabel>
                    <Select
                        labelId="templateId-label"
                        id="templateId"
                        value={selectedTemplateId}
                        onChange={handleTemplateIdFilter}
                        label="Template ID"
                        style={{ width: "10em" }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {filteredTemplates.map(({ id, friendlyName }) => (
                            <MenuItem key={id} value={id}>
                                {friendlyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default EstimatesSearch;