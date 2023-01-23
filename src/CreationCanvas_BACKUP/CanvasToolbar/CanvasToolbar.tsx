import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import TextFields from '@mui/icons-material/TextFields';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import RectangleOutlined from '@mui/icons-material/RectangleOutlined';


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
            <TextFields />
          </MenuButton>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <CircleOutlined />
          </MenuButton>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <RectangleOutlined />
          </MenuButton>
        </Toolbar>
      </AppBar>
    </StyledDiv>
  );
}

export default CanvasToolbar;
