import { useState } from 'react';
import { Button, Typography, Tooltip, useTheme } from '@mui/material';
import TemplatesGrid from './TemplatesGrid/TemplatesGrid';
import logger from '../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';


const Templates = () => {
  const [maxReached, setMaxReached] = useState(false);
  const theme = useTheme();
  const { user } = useAuth0();


  const handleNewTemplateClick = () => {
    logger.trackEvent({
      name: 'New Template Click',
      properties: { menu: 'New Template', user: user?.name, environment: process.env.NODE_ENV },
    });
  };

  return (
    <>
      <Typography color={theme.palette.text.primary} variant="h3">
        Templates
      </Typography>
      <br />
      <Tooltip
        title={maxReached ? 'Maximum number of templates reached' : ''}
        placement="top"
        disableHoverListener={!maxReached}
      >
        <span>
          <Button
            href="/choose-canvas-starter"
            onClick={handleNewTemplateClick}
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
            disabled={maxReached}
          >
            + New Template
          </Button>
        </span>
      </Tooltip>
      <br />
      <br />
      <TemplatesGrid setMaxReached={setMaxReached} />
    </>
  );
};

export default Templates;
