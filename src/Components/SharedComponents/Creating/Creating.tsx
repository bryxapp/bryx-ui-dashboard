import { LinearProgress, Typography } from "@mui/material";

const Creating = () => {
    return (
        <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Creating...
            </Typography>
            <LinearProgress />
        </div>
    );
}

export default Creating;
