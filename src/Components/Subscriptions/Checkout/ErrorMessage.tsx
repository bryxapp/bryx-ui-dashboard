import { Typography } from "@mui/material";
const ErrorMessage = ({ errorMessage }: any) => (
    <section>
        <Typography variant="body1" color="error" id="payment-message">
            {errorMessage}
        </Typography>
    </section>
);

export default ErrorMessage;