import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AddTextIcon from '@mui/icons-material/TextFields';
import AddRectangleeOutlineIcon from '@mui/icons-material/RectangleOutlined';
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
                        <AddRectangleeOutlineIcon />
                    </MenuButton>
                    <MenuButton edge="start" color="inherit" aria-label="menu">
                        <AddTextIcon />
                    </MenuButton>
                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

export default CanvasToolbar;