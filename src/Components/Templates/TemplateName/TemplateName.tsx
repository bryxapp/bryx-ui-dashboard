import { TextField } from '@mui/material';
import { styled } from '@mui/system';

interface TemplateNameProps {
  friendlyName: string;
  setFriendlyName: React.SetStateAction<any>;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& label': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const TemplateName = ({ friendlyName, setFriendlyName }: TemplateNameProps) => {
  return (
    <StyledTextField
      label='Template Name'
      value={friendlyName}
      onChange={(event) => setFriendlyName(event.target.value)}
      sx={{ width: '20%' }}
    />
  );
};

export default TemplateName;