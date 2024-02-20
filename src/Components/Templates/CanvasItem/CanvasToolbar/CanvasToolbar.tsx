import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';
import DeleteButton from './DeleteButton';
import SaveTemplateButton from './SaveButton';
import ColorPicker from './ColorPicker/ColorPicker'
import TextStyler from './TextStyler/TextStyler'
import PublicImagesMenu from './PublicImagesMenu/PublicImagesMenu';
import { CanvasDesignData, ShapeColor } from '../../../../utils/types/CanvasInterfaces';
import LayerManager from './LayerManager/LayerManager';
import UserImagesMenu from './UserImagesMenu/UserImages';
import CloseTemplateButton from './CloseButton';

interface CanvasToolbarProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: ShapeColor;
    setColor: React.SetStateAction<any>;
    friendlyName: string;
    dataBaseCanvasDesign: any;
    setDataBaseCanvasDesign: React.SetStateAction<any>;
}

const CanvasToolbar = ({ canvasDesign, setCanvasDesign, color, setColor, friendlyName, dataBaseCanvasDesign, setDataBaseCanvasDesign: setdataBaseCanvasDesign }: CanvasToolbarProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShapesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <TextMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <PublicImagesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <UserImagesMenu isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <ColorPicker isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} color={color} setColor={setColor} />
                        <TextStyler isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <LayerManager isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        <DeleteButton isLoading={isLoading} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    </div>
                    <div>
                        <SaveTemplateButton isLoading={isLoading} setIsLoading={setIsLoading} canvasDesign={canvasDesign} dataBaseCanvasDesign={dataBaseCanvasDesign} setdataBaseCanvasDesign={setdataBaseCanvasDesign} friendlyName={friendlyName} />
                        <CloseTemplateButton dataBaseCanvasDesign={dataBaseCanvasDesign} canvasDesign={canvasDesign} />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default CanvasToolbar;
