import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const TemplateNameField = styled(TextField)({
    });
    
const TemplateName = ({ friendlyName, setFriendlyName }: any) => {
  return (
    <TemplateNameField
      label="Template Name"
      value={friendlyName}
      onChange={(event) => setFriendlyName(event.target.value)}
    />
  );
};

export default TemplateName;