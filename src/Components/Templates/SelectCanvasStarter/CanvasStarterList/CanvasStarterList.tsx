import Grid from '@mui/material/Grid';
import CanvasListItem from "./CanvasStarterListItem/CanvasStarterListItem";
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';

const CanvasStarterList = () => {
    const canvasStarters: CanvasStarterData[] = CanvasStarters;
    return (
        <Grid container spacing={10}>
            {canvasStarters.map((canvasStarter: CanvasStarterData) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={canvasStarter.name}>
                    <CanvasListItem canvasStarter={canvasStarter} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CanvasStarterList;
