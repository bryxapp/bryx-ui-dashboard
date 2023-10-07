import {StyledTextField as TextField} from '../../SharedComponents/TextField/TextField'

interface TemplateNameProps {
  friendlyName: string;
  setFriendlyName: React.SetStateAction<any>;
}

const TemplateName = ({ friendlyName, setFriendlyName }: TemplateNameProps) => {
  return (
    <TextField
      label='Template Name'
      value={friendlyName}
      onChange={(event) => setFriendlyName(event.target.value)}
      sx={{ width: '20%' }}
    />
  );
};

export default TemplateName;