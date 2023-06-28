import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useLocation } from 'react-router-dom';
import { getEstimate } from "../../../utils/estimates-api";
import { getEstimateComments } from "../../../utils/estimate-comments-api";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import Loading from "../../SharedComponents/Loading/Loading";
import EstimateComments from "./EstimateComments/EstimateComments";
import useTheme from "@mui/material/styles/useTheme";
import EstimateShareBar from "./EstimateShareBar/EstimateShareBar";

const ViewEstimate = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const estimateId = params.get('estimateId');
    const theme = useTheme();

    const [estimate, setEstimate] = useState<EstimateData>();
    const [estimateError, setEstimateError] = useState(false);
    const [estimateComments, setEstimateComments] = useState<any[]>([]);
    const [commentsError, setCommentsError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (estimateId) {
            getEstimate(estimateId)
                .then((res) => {
                    setEstimate(res.data);
                    getEstimateComments(estimateId).then((res) => {
                        setEstimateComments(res.data);
                        setLoading(false);
                    }).catch
                        (() => {
                            setCommentsError(true);
                            setLoading(false);
                        }
                        );
                }).catch(() => {
                    setEstimateError(true);
                    setLoading(false);
                }
                );
        }
        else {
            setLoading(false);
        }
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
