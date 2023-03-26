
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import EstimatesList from "./EstimatesList/EstimatesList";
import { getEstimates } from "../../../utils/estimates-api";
import { getTemplates } from "../../../utils/templates-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import { TemplateData } from "../../../utils/types/TemplateInterfaces";

const PastEstimates = () => {

    const [estimates, setEstimates] = useState<EstimateData[]>([]);
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    const { user } = useAuth0();
    const userId = user?.email ? user.email : "";

    useEffect(() => {
        if (!userId) return;
        getEstimates(userId).then((response) => {
            setEstimates(response.data);
            setLoading(false);
        });
        getTemplates(userId).then((response) => {
            setTemplates(response.data);
        }
        );
    }, [userId]);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleTemplateIdFilter = (event: any) => {
        setSelectedTemplateId(event.target.value);
    };

    const uniqueTemplateIds = new Set(estimates.map(({ templateId }) => String(templateId)));
    const filteredTemplates = templates.filter(({ id }) => uniqueTemplateIds.has(String(id)?.toString()));

    const filteredEstimates = estimates
        .filter((estimate) => {
            return estimate.estimateName.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .filter((estimate) => {
            return selectedTemplateId === "" || estimate.templateId === selectedTemplateId;
        });


    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Past Estimates
            </Typography>
            <br />
            {loading && <Loading />}
            {!loading && filteredEstimates.length === 0 && <NoneFound item="estimates" />}
            {!loading && filteredEstimates.length > 0 && (
                <React.Fragment>
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
                            />
                        </div>
                        <div style={{ paddingLeft: "16px" }}> {/* add padding */}
                            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                <InputLabel id="templateId-label">Template ID</InputLabel>
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
                    <br />
                    <EstimatesList estimates={filteredEstimates} setEstimates={setEstimates} />
                </React.Fragment>
            )}
        </React.Fragment>
    );


};

export default PastEstimates;