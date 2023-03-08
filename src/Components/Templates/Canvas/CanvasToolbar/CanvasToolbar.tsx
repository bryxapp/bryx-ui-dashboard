import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AddTextIcon from '@mui/icons-material/TextFields';
import { styled } from '@mui/material/styles';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ShapesMenu from './ShapesMenu/ShapesMenu';

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

    const handleAddTextInput = () => {
        setCanvasDesign({
            ...canvasDesign,
            TextInputs: [
                ...canvasDesign.TextInputs,
                {
                    id: 'text-' + canvasDesign.TextInputs.length,
                    x: getWebCanvasWidth() / 6,
                    y: getWebCanvasHeight() / 2.5,
                    height: 50,
                    width: 200,
                    fill: '#F5F5F5',
                    fontSize: 20,
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
                    <ShapesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <Tooltip title="Add Text Input" placement="bottom">
                        <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleAddTextInput} disabled={isLoading}>
                            <AddTextIcon />
                        </MenuButton>
                    </Tooltip>
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