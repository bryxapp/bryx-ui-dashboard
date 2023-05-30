import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
interface NoneFoundProps {
    item: string;
}

const NoneFound = ({ item }: NoneFoundProps) => {
    const theme = useTheme();
    const textColor = theme.palette.mode === "dark" ? "white" : "black";
    return (
        <Typography color={textColor} variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            No {item} found
        </Typography>
    );
}

export default NoneFound;