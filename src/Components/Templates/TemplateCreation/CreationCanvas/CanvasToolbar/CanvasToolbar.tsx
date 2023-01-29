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

const CanvasToolbar = ({ shapes, setShapes }: any) => {
    const handleAddRectangle = () => {
        setShapes({
            ...shapes,
            Rectangles: [
                ...shapes.Rectangles,
                {
                    id: 'rect-' + shapes.Rectangles.length,
                    x: 20,
                    y: 20,
                    width: 100,
                    height: 100,
                    isDragging: false,
                }
            ]
        });
    }

    const handleAddTextInput = () => {
        setShapes({
            ...shapes,
            TextInputs: [
                ...shapes.TextInputs,
                {
                    id: 'text-' + shapes.TextInputs.length,
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    isDragging: false,
                }
            ]
        });
    }

    return (
        <StyledDiv>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleAddRectangle}>
                        <AddRectangleeOutlineIcon />
                    </MenuButton>
                    <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleAddTextInput}>
                        <AddTextIcon />
                    </MenuButton>
                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

export default CanvasToolbar;