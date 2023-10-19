import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import Loading from '../../SharedComponents/Loading/Loading';
import EstimateComments from './EstimateComments/EstimateComments';
import EstimateShareBar from './EstimateShareBar/EstimateShareBar';
import { getEstimate } from '../../../utils/api/estimates-api';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';

const ViewEstimate = () => {
    const { search } = useLocation();
    const theme = useTheme();
    const { getAccessToken, auth0User } = useAuth0User();

    const [estimate, setEstimate] = useState<EstimateData | null>(null);
    const [estimateError, setEstimateError] = useState(false);
    const [loading, setLoading] = useState(true);
    const urlestimateId = new URLSearchParams(search).get('estimateId');

    useEffect(() => {
        const fetchEstimate = async (id: string) => {
            if (estimate) return;
            const token = await getAccessToken();
            if (!token) return;
            debugger;
            try {
                const fetchedEstimate = await getEstimate(id, token);
                setEstimate(fetchedEstimate);
                setLoading(false);
            } catch {
                setEstimateError(true);
                setLoading(false);
            }
        };
        if (urlestimateId) {
            fetchEstimate(urlestimateId);
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, auth0User?.sub]);


    if (loading) return <Loading />;
    if (estimateError) return <Typography variant="h3" color="primary">Error loading estimate</Typography>;

    return (
        <div>
            <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>{estimate?.estimateName}</Typography>
            <div style={{ height: 20 }} />
            <EstimateShareBar estimate={estimate} />
            <div style={{ height: 20 }} />
            <iframe src={estimate?.estimatePdfUrl} width="100%" height="900" title="PDF"></iframe>
            <EstimateComments estimate={estimate} />
        </div>
    );
};

export default ViewEstimate;
