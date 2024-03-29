import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';
import SaveTemplateButton from './SaveButton';
import LayerManager from './LayerManager/LayerManager';
import CloseTemplateButton from './CloseButton';
import ImagesMenu from './ImagesMenu/ImagesMenu';
import InputStyler from './InputStyler/InputStyler';

interface CanvasToolbarProps {
    friendlyName: string;
    databaseFriendlyName: string;
    dataBaseCanvasDesign: any;
    setDataBaseCanvasDesign: React.SetStateAction<any>;
    setDataBaseFriendlyName: React.SetStateAction<any>;
}

const CanvasToolbar = ({ friendlyName, dataBaseCanvasDesign, setDataBaseCanvasDesign, databaseFriendlyName, setDataBaseFriendlyName }: CanvasToolbarProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShapesMenu isLoading={isLoading} />
                        <TextMenu isLoading={isLoading} />
                        <ImagesMenu isLoading={isLoading} />
                        <LayerManager isLoading={isLoading} />
                    </div>
                    <div>
                        <SaveTemplateButton isLoading={isLoading} setIsLoading={setIsLoading} dataBaseCanvasDesign={dataBaseCanvasDesign} setDataBaseCanvasDesign={setDataBaseCanvasDesign} friendlyName={friendlyName} databaseFriendlyName={databaseFriendlyName} setDatabaseFriendlyName={setDataBaseFriendlyName} />
                        <CloseTemplateButton dataBaseCanvasDesign={dataBaseCanvasDesign} friendlyName={friendlyName} databaseFriendlyName={databaseFriendlyName} />
                    </div>
                </Toolbar>
            </AppBar>
            <InputStyler />
        </>
    );
}

export default CanvasToolbar;
