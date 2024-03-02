import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
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

const ViewEstimate = () => {
    const { search } = useLocation();
    const theme = useTheme();
    const [estimate, setEstimate] = useState<EstimateData | null>(null);
    const [estimateError, setEstimateError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 }); // State to store canvas dimensions
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
                setCanvasDimensions({ width: pageWidth, height: pageHeight }); // Update state with new dimensions

                const rect = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: pageWidth,
                    height: pageHeight,
                    fill: "white",
                });
                // Create a new layer
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
    }, [estimate]); // Depend only on `estimate`

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
                    width: canvasDimensions.width,
                    height: canvasDimensions.height,
                    backgroundColor: 'gray',
                    padding: '3px',
                }}
            >
                <Stage width={canvasDimensions.width} height={canvasDimensions.height} />
            </div>
            {auth0User && <EstimateComments estimate={estimate} />}
        </div>
    );
};

export default ViewEstimate;
