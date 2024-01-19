import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import Loading from '../Loading/Loading';
import { getEstimate } from '../../../utils/api/estimates-api';
import { EstimateData } from '../../../utils/types/EstimateInterfaces'
import Konva from 'konva';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../utils/page-util';
import { Stage } from 'react-konva';
import { AddShapesToLayer } from '../../../utils/canvas-util';
import EstimateShareBar from './EstimateShareBar/EstimateShareBar';
import EstimateComments from './EstimateComments/EstimateComments';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';

const ViewEstimate = () => {
    const { search } = useLocation();
    const theme = useTheme();
    const [estimate, setEstimate] = useState<EstimateData | null>(null);
    const [estimateError, setEstimateError] = useState(false);
    const [loading, setLoading] = useState(true);
    const urlestimateId = new URLSearchParams(search).get('estimateId');
    const { auth0User } = useAuth0User();

    const pageWidth = getWebCanvasWidth();
    const pageHeight = getWebCanvasHeight();

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
    }, [search]);

    useEffect(() => {
        const setupCanvas = async () => {
            if (estimate && estimate.canvasDesign && estimate.fieldValues) {
                const rect = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: getWebCanvasWidth(),
                    height: getWebCanvasHeight(),
                    fill: "white"
                });
                // Create a new layer
                const newLayer = new Konva.Layer();
                newLayer.add(rect);

                await AddShapesToLayer(estimate.canvasDesign, estimate.fieldValues, newLayer);

                const newStage = new Konva.Stage({
                    width: pageWidth,
                    height: pageHeight,
                    container: 'containerId'

                });
                newStage.add(newLayer);
            }
        };
        setupCanvas();
    }, [estimate, pageHeight, pageWidth]);


    if (loading) return <Loading />;
    if (estimateError) return <Typography variant="h3" color="primary">Error loading estimate</Typography>;
    if (!estimate) return <Typography variant="h3" color="primary">No estimate found</Typography>;

    return (
        <div>
            <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>{estimate?.estimateName}</Typography>
            <div style={{ height: 20 }} />
            <EstimateShareBar estimate={estimate} />
            <div style={{ height: 20 }} />
            <div id="containerId"
                style={{
                    width: pageWidth,
                    height: pageHeight,
                    backgroundColor: 'gray',
                    padding: '3px'
                }}
            >
                <Stage width={pageWidth} height={pageHeight} />
            </div>
            {auth0User && <EstimateComments estimate={estimate} />}
        </div>
    );
};

export default ViewEstimate;
