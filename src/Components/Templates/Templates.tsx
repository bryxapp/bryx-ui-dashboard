import { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import TemplatesGrid from '../SharedComponents/Templates/TemplatesGrid/TemplatesGrid';
import NewTemplateButton from './NewTemplateButton';


const Templates = () => {
  const [maxTemplatesReached, setMaxTemplatesReached] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Typography color={theme.palette.text.primary} variant="h3">
        Templates
      </Typography>
      <br />
      <NewTemplateButton maxTemplatesReached={maxTemplatesReached} />
      <br />
      <br />
      <TemplatesGrid
        setMaxReached={setMaxTemplatesReached}
        baseUrl='/edit-template?templateId='
        showActions={true} />
    </>
  );
};

export default Templates;
