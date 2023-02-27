import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AddTextIcon from '@mui/icons-material/TextFields';
import AddRectangleeOutlineIcon from '@mui/icons-material/RectangleOutlined';
import { styled } from '@mui/material/styles';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
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

const CanvasToolbar = ({ canvasDesign, setCanvasDesign, friendlyName, postTemplate }: any) => {
    const [isLoading, setIsLoading] = useState(false);

    //adds rectangle to center of page
    const handleAddRectangle = () => {
        setCanvasDesign({
            ...canvasDesign,
            Rectangles: [
                ...canvasDesign.Rectangles,
                {
                    id: 'rect-' + canvasDesign.Rectangles.length,
                    x: getWebCanvasWidth() / 4,
                    y: getWebCanvasHeight() / 6,
                    isDragging: false,
                }
            ]
        });
    }

    const handleAddTextInput = () => {
        setCanvasDesign({
            ...canvasDesign,
            TextInputs: [
                ...canvasDesign.TextInputs,
                {
                    id: 'text-' + canvasDesign.TextInputs.length,
                    x: getWebCanvasWidth() / 6,
                    y: getWebCanvasHeight() / 2.5,
                    isDragging: false,
                }
            ]
        });
    }

    const handleSave = () => {
        //Show loader until post is complete
        setIsLoading(true)
        postTemplate().then(() => {
            //Hide loader
            setIsLoading(false)
            window.location.href = "/templates";
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
                    {isLoading ? <SaveButton edge="end" color="inherit" aria-label="save">
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