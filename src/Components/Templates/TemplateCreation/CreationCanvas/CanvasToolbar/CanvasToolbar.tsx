import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')({
  flexGrow: 1
});

const MenuButton = styled(IconButton)({
  marginRight: '36px',
});

const CanvasToolbar = () => {

  return (
    <StyledDiv>
      <AppBar position="static">
        <Toolbar variant="dense">
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <AddCircleOutlineIcon />
          </MenuButton>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <DeleteOutlineIcon />
          </MenuButton>
        </Toolbar>
      </AppBar>
    </StyledDiv>
  );
}

export default CanvasToolbar;
