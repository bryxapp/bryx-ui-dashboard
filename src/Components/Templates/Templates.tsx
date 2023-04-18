import { Button, Typography } from '@mui/material';
import React from 'react';
import TemplatesList from './TemplatesList/TemplateList';
import logger from '../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';

const Templates = () => {
    const { user } = useAuth0();
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
    const handleNewTemplateClick = () => {
        logger.trackEvent({
            name: 'New Template Click',
            properties: { menu: 'New Template', user: user?.name, environment: process.env.NODE_ENV },
        });
    };

    return (
        <React.Fragment>
            <Typography color={textColor} variant='h3'>
                Templates
            </Typography>
            <br />
            <Button
                href='/choose-canvas-starter'
                onClick={handleNewTemplateClick}
                variant='contained'
                color='primary'
                size='large'
                sx={{ borderRadius: 2 }}
            >
                + New Template
            </Button>
            {/* List of templates */}
            <TemplatesList />
        </React.Fragment>
    );
};

export default Templates;
