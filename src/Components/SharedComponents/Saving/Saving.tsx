import { CircularProgress, Typography } from "@mui/material";


const Saving = () => {
    return (
        <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Saving... <CircularProgress />
            </Typography>
        </div>
    );
}

export default Saving;