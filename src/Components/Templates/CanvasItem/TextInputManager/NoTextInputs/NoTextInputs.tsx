import { Typography } from "@mui/material";

const NoTextInputs = () => {
    return (
        <>
            <div style={{ height: "2rem" }} />
            <Typography variant="body1" align="center">
                No text inputs found
            </Typography>
            <div style={{ height: ".25rem" }} />
            <Typography variant="body1" align="center">
                Add text inputs to your canvas to edit their names, font sizes, and colors here
            </Typography>
        </>
    );
};

export default NoTextInputs;