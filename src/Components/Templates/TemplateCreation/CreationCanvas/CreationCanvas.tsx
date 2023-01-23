import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
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
            <SidePanelWrap>
                <SidePanel store={store} />
            </SidePanelWrap>
            <WorkspaceWrap>
                <Toolbar store={store} />
                <Workspace store={store} />
                <ZoomButtons store={store} />
            </WorkspaceWrap>
        </PolotnoContainer>
    );
};

export default CreationCanvas;