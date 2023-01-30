import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AddTextIcon from '@mui/icons-material/TextFields';
import AddRectangleeOutlineIcon from '@mui/icons-material/RectangleOutlined';
import { styled } from '@mui/material/styles';
import { getPageHeight, getPageWidth } from '../../../../../utils/page-util';

const StyledDiv = styled('div')({
    flexGrow: 1
});

const MenuButton = styled(IconButton)({
    marginRight: '36px',
});

const SaveButton = styled(IconButton)({
    marginLeft: 'auto'
});

const CanvasToolbar = ({ shapes, setShapes }: any) => {
    //adds rectangle to center of page
    const handleAddRectangle = () => {
        setShapes({
            ...shapes,
            Rectangles: [
                ...shapes.Rectangles,
                {
                    id: 'rect-' + shapes.Rectangles.length,
                    x: getPageHeight() / 2, //center of page
                    y: getPageWidth() / 2, //center of page
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
                    x: getPageHeight() / 2, //center of page
                    y: getPageWidth() / 2, //center of page
                    isDragging: false,
                }
            ]
        });
    }

    const handleSave = () => {
        console.log("SAVED")
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
                    <SaveButton edge="end" color="inherit" aria-label="save" onClick={handleSave}>
                        Done
                    </SaveButton>
                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

export default CanvasToolbar;