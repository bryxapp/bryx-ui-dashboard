import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useLocation } from 'react-router-dom';
import { getEstimate } from "../../../utils/api/estimates-api";
import { getEstimateComments } from "../../../utils/api/estimate-comments-api";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import Loading from "../../SharedComponents/Loading/Loading";
import EstimateComments from "./EstimateComments/EstimateComments";
import useTheme from "@mui/material/styles/useTheme";
import EstimateShareBar from "./EstimateShareBar/EstimateShareBar";
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';

const ViewEstimate = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const estimateId = params.get('estimateId');
    const theme = useTheme();
    const { getAccessToken } = useAuth0User();


    const [estimate, setEstimate] = useState<EstimateData>();
    const [estimateError, setEstimateError] = useState(false);
    const [estimateComments, setEstimateComments] = useState<any[]>([]);
    const [commentsError, setCommentsError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstimate = async () => {
            if (estimateId) {
                const token = await getAccessToken();
                if (!token) return;
                try {
                    const estimate = await getEstimate(estimateId, token);
                    setEstimate(estimate);
                    getEstimateComments(estimateId, token).then((res) => {
                        setEstimateComments(res.data);
                        setLoading(false);
                    }).catch
                        (() => {
                            setCommentsError(true);
                            setLoading(false);
                        }
                        );
                }
                catch {
                    setEstimateError(true);
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        }
        fetchEstimate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estimateId]);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (estimateError) {
        return (
            <Typography variant="h3" color="primary">
                Error loading estimate
            </Typography>
        );
    }

    return (
        <div>
            <Typography variant="h3" sx={{
                color: theme.palette.text.primary,
            }}>
                {estimate?.estimateName}
            </Typography>
            <div style={{ height: 20 }}></div>
            <EstimateShareBar estimate={estimate} />
            <div style={{ height: 20 }}></div>
            <div>
                <iframe src={estimate?.estimatePdfUrl} width="100%" height="900" title="PDF"></iframe>
            </div>
            <EstimateComments estimateId={estimateId || ''} estimateComments={estimateComments} setEstimateComments={setEstimateComments} commentsError={commentsError} />
        </div>
    );
}

export default ViewEstimate;
