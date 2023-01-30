import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AddTextIcon from '@mui/icons-material/TextFields';
import AddRectangleeOutlineIcon from '@mui/icons-material/RectangleOutlined';
import { styled } from '@mui/material/styles';
import { getPageHeight, getPageWidth } from '../../../../../utils/page-util';
import { postNewTemplate } from '../../../../../utils/templates-api';
import { useState } from 'react';

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
    const [isLoading, setIsLoading] = useState(false);

    //adds rectangle to center of page
    const handleAddRectangle = () => {
        setShapes({
            ...shapes,
            Rectangles: [
                ...shapes.Rectangles,
                {
                    id: 'rect-' + shapes.Rectangles.length,
                    x: getPageWidth() / 4,
                    y: getPageHeight() / 6,
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
                    x: getPageWidth() / 6,
                    y: getPageHeight() / 2.5,
                    isDragging: false,
                }
            ]
        });
    }

    const handleSave = () => {
        //Show loader until post is complete
        setIsLoading(true)
        postNewTemplate(shapes).then(() => {
            //Hide loader
            window.location.href = "/templates";
            console.log("SAVED")
            setIsLoading(false)
        });
    }

    return (
        <StyledDiv>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleAddRectangle} disabled={isLoading} >
                        <AddRectangleeOutlineIcon />
                    </MenuButton>
                    <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleAddTextInput} disabled={isLoading}>
                        <AddTextIcon />
                    </MenuButton>
                    {isLoading ? <SaveButton edge="end" color="inherit" aria-label="save" onClick={handleSave}>
                        Loading...
                    </SaveButton> : <SaveButton edge="end" color="inherit" aria-label="save" onClick={handleSave}>
                        Done
                    </SaveButton>}
                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

export default CanvasToolbar;