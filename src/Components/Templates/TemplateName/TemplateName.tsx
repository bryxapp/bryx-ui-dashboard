import { TextField } from '@mui/material';

const TemplateName = ({ friendlyName, setFriendlyName }: any) => {
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
