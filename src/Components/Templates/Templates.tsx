import { Button, Typography, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import React from "react";
import TemplatesList from "./TemplatesList/TemplateList";


const Templates = () => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Templates
            </Typography>
            <br />
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2 }}>
                + New Template
            </Button>
            {/*//List of templates */}
            <TemplatesList />
        </React.Fragment>
    );
};

export default Templates;