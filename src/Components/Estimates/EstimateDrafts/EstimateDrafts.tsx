
import React, { useEffect, useState } from "react";
import EstimatesList from "./EstimateDraftsList/EstimateDraftsList";
import { getEstimateDrafts } from "../../../utils/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";

const EstimateDrafts = () => {
    const [estimateDrafts, setEstimateDrafts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email ? user.email : "";

    useEffect(() => {
        if (!userId) return;
        getEstimateDrafts(userId).then((response) => {
            setEstimateDrafts(response.data);
            setLoading(false);
        });
    }, [userId]);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {!loading && estimateDrafts.length === 0 && <NoneFound item="drafts" />}
            {!loading && estimateDrafts.length > 0 && (
                <EstimatesList estimateDrafts={estimateDrafts} setEstimateDrafts={setEstimateDrafts} />
            )}
        </React.Fragment>
    );
};

export default EstimateDrafts;