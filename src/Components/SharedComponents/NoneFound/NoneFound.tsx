import Typography from "@mui/material/Typography";
interface NoneFoundProps {
    item: string;
}

const NoneFound = ({item}:NoneFoundProps) => {
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            No {item} found
        </Typography>
    );
}

export default NoneFound;