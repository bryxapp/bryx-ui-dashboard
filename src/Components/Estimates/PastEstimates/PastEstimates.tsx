
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import EstimatesList from "./EstimatesList/EstimatesList";
import { getEstimates } from "../../../utils/estimates-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";

const PastEstimates = () => {

    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth0();
    const userId = user?.email ? user.email : "";

    useEffect(() => {
        if(!userId) return;
        getEstimates(userId).then((response) => {
            setEstimates(response.data);
            setLoading(false);
        });
    }, [userId]);

    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Past Estimates
            </Typography>
            <br />
            {/*//List of Estimates */}
            {loading && <Loading />}
            {!loading && estimates.length === 0 && <NoneFound item="estimates"/>}
            {!loading && estimates.length > 0 && <EstimatesList estimates={estimates} setEstimates={setEstimates} />}

        </React.Fragment>
    );
};

export default PastEstimates;