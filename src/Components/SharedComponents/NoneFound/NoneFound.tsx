import Typography from "@mui/material/Typography";

const NoneFound = ({item}:any) => {
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                No {item} found
            </Typography>
    );
}

export default NoneFound;