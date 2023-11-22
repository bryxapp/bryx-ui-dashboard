import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const NewTemplateItem = () => {
  const theme = useTheme();

  return (
    <Link to={"/choose-canvas-starter"} style={{ textDecoration: 'none' }}>
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '19rem',
        width: '18rem',
        overflow: 'hidden',
        background: theme.palette.secondary.main,
      }}
    >
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h4" color={theme.palette.primary.main} gutterBottom>
            + Create New Template
          </Typography>
        </Box>
    </Paper>
    </Link>
  );
};

export default NewTemplateItem;
