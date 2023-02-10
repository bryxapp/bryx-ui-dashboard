import RecentPreview from "./RecentPreview/RecentPreview";
import Grid from '@mui/material/Grid';

const RecentPreviews = ({ objects, url}: any) => {
    return (
        <Grid container spacing={3}>
            {objects.map((template: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={template._id}>
                    <RecentPreview object={template} url = {url} />
                </Grid>
            ))}
        </Grid>
    );
};

export default RecentPreviews;