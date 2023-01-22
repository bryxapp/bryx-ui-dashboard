
import { Typography } from '@mui/material';
import CanvasStage from './CanvasStage/CanvasStage';
import CanvasToolbar from './CanvasToolbar/CanvasToolbar';


const CreationCanvas = () => {

    return (
        <div>
            <CanvasToolbar />
            <Typography variant="h6" component="h1" gutterBottom>
                Try draging a star around
            </Typography>
            <CanvasStage />
        </div>
    );
};
export default CreationCanvas;
