import { CircularProgress, Typography } from "@mui/material";


const Creating = () => {
    return (
        <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Creating... <CircularProgress />
            </Typography>
        </div>
    );
}

export default Creating;