import { SidePanelWrap } from 'polotno';
import { SidePanel } from 'polotno/side-panel';

const CanvasSidePanel = (store: any) => {
    return (
        <SidePanelWrap>
            <SidePanel store={store} />
        </SidePanelWrap>
    );
};

export default CanvasSidePanel;