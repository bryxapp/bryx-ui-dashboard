import ShapesMenu from './ShapesMenu/ShapesMenu';
import TextMenu from './TextMenu/TextMenu';
import LayerManager from './LayerManager/LayerManager';
import ImagesMenu from './ImagesMenu/ImagesMenu';
import InputStyler from './InputStyler/InputStyler';
import { Header } from 'antd/es/layout/layout';

interface CanvasToolbarProps {
    isLoading: boolean;
}

const CanvasToolbar = ({ isLoading }: CanvasToolbarProps) => {
    return (
        <>
            <Header style={{backgroundColor: "#1677ff", display: 'flex', alignItems: 'center', justifyContent: 'start', gap:"10px" }}>
                        <ShapesMenu isLoading={isLoading} />
                        <TextMenu isLoading={isLoading} />
                        <ImagesMenu isLoading={isLoading} />
                        <LayerManager isLoading={isLoading} />
            </Header>
            <InputStyler />
        </>
    );
}

export default CanvasToolbar;
