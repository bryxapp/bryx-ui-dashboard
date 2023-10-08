import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme, Button } from '@mui/material';
import { Box } from '@mui/system';
import SubscriptionDialog from '../../Subscriptions/SubscriptionDialog';

const Footer = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ minHeight: '10%', padding: '1.2rem', background: theme.palette.background.default, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <Typography variant="body2" color={theme.palette.text.primary} align="center">
                    {'Copyright © '}
                    BRYX bids
                    {' '}
                    {new Date().getFullYear()}
                </Typography>

                {/* Styled Button to look like a link */}
                <Button
                    onClick={handleOpen}
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'none', padding: 0 }}
                    disableRipple
                >
                    Upgrade Subscription
                </Button>
            </Box>
            {/* Support email */}
            <Typography variant="body2" color={theme.palette.text.primary} align="center">
                Support: <a href="mailto:thomas.bryan.m@gmail.com" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>thomas.bryan.m@gmail.com</a>
            </Typography>
            <SubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </Box>
    )
}

export default Footer;
