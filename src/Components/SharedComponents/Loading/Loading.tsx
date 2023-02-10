import { Typography } from "@mui/material";


const Loading = () => {
    return (
        <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Loading...
            </Typography>
        </div>
    );
}

export default Loading;