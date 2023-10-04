
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
    return (
        <RouterLink {...props} style={{ textDecoration: 'none' }}>
            {children}
        </RouterLink>
    );
};

export default Link;
