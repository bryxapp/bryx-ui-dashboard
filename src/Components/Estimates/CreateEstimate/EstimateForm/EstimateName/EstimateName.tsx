import { TextField } from "@mui/material";

const EstimateName = ({ estimateName, setEstimateName }: any) => {
  return (
    <TextField
      label="Estimate Name"
      value={estimateName}
      onChange={(event) => setEstimateName(event.target.value)}
    />
  );
};

export default EstimateName;