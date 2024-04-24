import { useState, useEffect } from 'react';
import { Image, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getEstimate } from '../../../utils/api/estimates-api';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import EstimateShareBar from './EstimateShareBar/EstimateShareBar';
import EstimateComments from './EstimateComments/EstimateComments';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';

const { Title } = Typography;

const ViewEstimate = () => {
    const { search } = useLocation();
    const [estimate, setEstimate] = useState<EstimateData | null>(null);
    const [estimateError, setEstimateError] = useState(false);
    const [loading, setLoading] = useState(true);
    const urlestimateId = new URLSearchParams(search).get('estimateId');
    const { auth0User } = useAuth0User();

    useEffect(() => {
        const fetchEstimate = async (id: string) => {
            if (estimate) return;
            try {
                const fetchedEstimate = await getEstimate(id);
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
    }, [search, estimate]);

    if (loading) return <Loading />;
    if (estimateError) return <Title level={3}>Error loading estimate</Title>;
    if (!estimate) return <Title level={3}>No estimate found</Title>;

    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: '70%', display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                <Title level={3}>{estimate?.estimateName}</Title>
                <EstimateShareBar estimate={estimate} />
                <div style={{ height: 20 }} />
                <Image id="containerId" src={estimate.estimateImgObj} />
                {auth0User && <EstimateComments estimate={estimate} />}
            </div>
        </div>
    );
};

export default ViewEstimate;