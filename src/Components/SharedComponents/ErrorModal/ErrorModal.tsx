import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface Props {
    error: boolean;
    setError: any;
}

const ErrorModal = ({ error, setError }: Props) => {
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" onClose={() => setError(false)}>
                There was an issue
            </Alert>
        </Snackbar>
    );
}

export default ErrorModal;