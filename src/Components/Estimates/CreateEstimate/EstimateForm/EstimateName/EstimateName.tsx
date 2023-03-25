import { TextField } from "@mui/material";

interface EstimateNameProps {
  estimateName: string;
  setEstimateName: (newEstimateName: string) => void;
}
const EstimateName = ({ estimateName, setEstimateName }: EstimateNameProps) => {
  return (
    <TextField
      label="Estimate Name"
      value={estimateName}
      onChange={(event) => setEstimateName(event.target.value)}
    />
  );
};

export default EstimateName;