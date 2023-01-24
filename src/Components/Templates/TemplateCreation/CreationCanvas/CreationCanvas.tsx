import { PolotnoContainer } from 'polotno';
import CanvasSidePanel from './CanvasSidePanel/CanvasSidePanel';
import CanvasWorkspace from './CanvasWorkspace/CanvasWorkspace';
import { createDemoApp } from 'polotno/polotno-app';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';


const { store } = createDemoApp({
    container: document.getElementById('root'),
    key: process.env.REACT_APP_POLOTNO_API_KEY,
    showCredit: true,
});

const CreationCanvas = () => {
    return (
        <PolotnoContainer style={{ width: '40vw', height: '80vh' }}>
            <CanvasSidePanel store={store} />
            <CanvasWorkspace store={store} />
        </PolotnoContainer>
    );
};

export default CreationCanvas;