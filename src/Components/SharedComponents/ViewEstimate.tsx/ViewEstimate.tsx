import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getEstimate } from '../../../utils/api/estimates-api';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import Konva from 'konva';
import { Stage } from 'react-konva';
import EstimateShareBar from './EstimateShareBar/EstimateShareBar';
import EstimateComments from './EstimateComments/EstimateComments';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { getWebCanvasDimensions } from '../../../utils/canvasUtils';
import { AddShapesToLayer } from '../../../utils/shapeManagementUtils';
import styled from '@emotion/styled';

const { Title } = Typography;

const ViewEstimate = () => {
    const { search } = useLocation();
    const [estimate, setEstimate] = useState<EstimateData | null>(null);
    const [estimateError, setEstimateError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
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

    useEffect(() => {
        const setupCanvas = async () => {
            if (estimate && estimate.canvasDesign && estimate.fieldValues) {
                const [pageWidth, pageHeight] = getWebCanvasDimensions(estimate.canvasDesign);
                setCanvasDimensions({ width: pageWidth, height: pageHeight });

                const rect = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: pageWidth,
                    height: pageHeight,
                    fill: 'white',
                });

                const newLayer = new Konva.Layer();
                newLayer.add(rect);

                await AddShapesToLayer(estimate.canvasDesign, estimate.fieldValues, newLayer);

                const newStage = new Konva.Stage({
                    width: pageWidth,
                    height: pageHeight,
                    container: 'containerId',
                });
                newStage.add(newLayer);
            }
        };
        setupCanvas();
    }, [estimate]);

    if (loading) return <Loading />;
    if (estimateError) return <Title level={3}>Error loading estimate</Title>;
    if (!estimate) return <Title level={3}>No estimate found</Title>;

    const PiecePaper = styled('div')({
        width: canvasDimensions.width,
        height: canvasDimensions.height,
        boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
        borderRadius: '0.1in',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: 'white',
      });

    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: canvasDimensions.width, display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                <Title level={3}>{estimate?.estimateName}</Title>
                <EstimateShareBar estimate={estimate} />
                <div style={{ height: 20 }} />
                <PiecePaper
                                  id="containerId"
                                  >
                    <Stage width={canvasDimensions.width} height={canvasDimensions.height} />
                </PiecePaper>
                {auth0User && <EstimateComments estimate={estimate} />}
            </div>
        </div>
    );
};

export default ViewEstimate;