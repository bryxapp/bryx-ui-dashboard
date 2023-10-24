import Alert from "@mui/material/Alert";

interface Props {
    dataName: string;
}

const Error = ({ dataName }: Props) => {
    return (
        <Alert severity="error">There was an error retrieving {dataName} data. Please refresh to try again.</Alert>
    );
}

export default Error;