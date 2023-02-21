
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import EstimatesList from "./EstimatesList/EstimatesList";
import { getEstimates } from "../../../utils/estimates-api";
import Loading from "../../SharedComponents/Loading/Loading";

const PastEstimates = () => {

    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEstimates().then((response) => {
            setEstimates(response.data.resources);
            setLoading(false);
        });
    }, []);

    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Past Estimates
            </Typography>
            <br />
            {/*//List of Estimates */}
            {loading && <Loading />}
            {!loading && estimates.length === 0 && <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                No estimates found
            </Typography>}
            {!loading && estimates.length > 0 && <EstimatesList estimates={estimates} setEstimates={setEstimates} />}

        </React.Fragment>
    );
};

export default PastEstimates;