import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';
import DeleteButton from './DeleteButton';
import SaveTemplateButton from './SaveButton';
import ColorPicker from './ColorPicker/ColorPicker'
import TextStyler from './TextStyler/TextStyler'
import { CanvasDesignData, ShapeColor } from '../../../../utils/types/CanvasInterfaces';
import LayerManager from './LayerManager/LayerManager';
import CloseTemplateButton from './CloseButton';
import ImagesMenu from './ImagesMenu/ImagesMenu';
import InputStyler from './InputStyler/InputStyler';

interface CanvasToolbarProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: ShapeColor;
    setColor: React.SetStateAction<any>;
    friendlyName: string;
    databaseFriendlyName: string;
    dataBaseCanvasDesign: any;
    setDataBaseCanvasDesign: React.SetStateAction<any>;
    setDataBaseFriendlyName: React.SetStateAction<any>;
}

const CanvasToolbar = ({ canvasDesign, setCanvasDesign, color, setColor, friendlyName, dataBaseCanvasDesign, setDataBaseCanvasDesign, databaseFriendlyName, setDataBaseFriendlyName }: CanvasToolbarProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShapesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <TextMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <ImagesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <ColorPicker isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} color={color} setColor={setColor} />
                        <LayerManager isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <DeleteButton isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    </div>
                    <div>
                        <SaveTemplateButton isLoading={isLoading} setIsLoading={setIsLoading} canvasDesign={canvasDesign} dataBaseCanvasDesign={dataBaseCanvasDesign} setDataBaseCanvasDesign={setDataBaseCanvasDesign} friendlyName={friendlyName} databaseFriendlyName={databaseFriendlyName} setDatabaseFriendlyName={setDataBaseFriendlyName} />
                        <CloseTemplateButton dataBaseCanvasDesign={dataBaseCanvasDesign} canvasDesign={canvasDesign} friendlyName={friendlyName} databaseFriendlyName={databaseFriendlyName} />
                    </div>
                </Toolbar>
            </AppBar>
            <TextStyler canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <InputStyler canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </>
    );
}

export default CanvasToolbar;
