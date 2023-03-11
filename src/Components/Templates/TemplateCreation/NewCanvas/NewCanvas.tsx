import { useState } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../utils/types/TemplateCreationInterfaces";
import { createTemplate } from "../../../../utils/templates-api";
import { useAuth0 } from "@auth0/auth0-react";
import TextInputManager from "../../Canvas/TextInputManager/TextInputManager";
import Box from "@mui/material/Box";

const NewCanvas = ({ friendlyName }: any) => {


    const { user } = useAuth0();
    const userName = user?.email ? user.email : "";

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>({
        Rectangles: [],
        Circles: [],
        Lines: [],
        TextInputs: [],
    });

    const createTemplateOnSave = () => {
        //create new template
        return createTemplate(canvasDesign, friendlyName, userName);
    }

    return (
        <div>
            <div style={{ width: '100%' }}>
                <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} postTemplate={createTemplateOnSave} />
            </div>
            <Box sx={{ height: '1vh' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flexGrow: 1 }}>
                    <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <TextInputManager canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
            </div>
        </div>
    );
};

export default NewCanvas;