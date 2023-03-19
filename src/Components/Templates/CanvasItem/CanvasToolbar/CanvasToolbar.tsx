import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import ColorPicker from './ColorPicker/ColorPicker'
import TextStyler from './TextStyler/TextStyler'


const CanvasToolbar = ({ canvasDesign, setCanvasDesign, friendlyName, postTemplate, color, setColor, selectedId }: any) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShapesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <TextMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <ColorPicker isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} color={color} setColor={setColor} selectedId={selectedId} />
                        <TextStyler isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} />
                        <DeleteButton isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    </div>
                    <div>
                        <SaveButton isLoading={isLoading} setIsLoading={setIsLoading} friendlyName={friendlyName} postTemplate={postTemplate} style={{ marginLeft: 'auto' }} />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default CanvasToolbar;
