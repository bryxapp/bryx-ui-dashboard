import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';

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

    const handleSave = () => {
        //Show loader until post is complete
        setIsLoading(true)
        postTemplate().then(() => {
            //Hide loader
            setIsLoading(false)
            window.location.href = "/templates";
        });
    }

    const handleDeleteShape = () => {
        console.log("ID" + canvasDesign.selectedId)
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach((shapeType: string) => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].filter((shape: any) => shape.id !== canvasDesign.selectedId);
        });
        canvasDesign.selectedId = null;
        setCanvasDesign(updatedCanvasDesign);
    }

    return (
        <StyledDiv>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <ShapesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <TextMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <Tooltip title="Delete Shape" placement="bottom">
                        <MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleDeleteShape} disabled={isLoading || !canvasDesign.selectedId}>
                            <DeleteIcon />
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