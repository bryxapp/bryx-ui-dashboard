import { Html } from 'react-konva-utils';
import { isSolidShapeObj, isTextObject } from '../../../../utils/shapeManagementUtils';
import { ShapeObj, SolidShapeObj, TextObj } from '../../../../utils/types/CanvasInterfaces';
import TextPropertiesMenu from '../CanvasToolbar/InputStyler/TextPropertiesMenu/TextPropertiesMenu';
import DeleteButton from '../CanvasToolbar/DeleteButton';
import { PassInCanvasDesignProvider, useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import ColorPicker from '../CanvasToolbar/ColorPicker/ColorPicker';

interface EditMenuProps {
    shapeObj: ShapeObj;
    width: number;
}

const EditMenu = ({
    shapeObj,
    width,
}: EditMenuProps) => {
    const istextObj = isTextObject(shapeObj);
    const issolidShapeObj = isSolidShapeObj(shapeObj);
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();

    return (
        <Html>
            <PassInCanvasDesignProvider canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} setSelectedId={setSelectedId}>
                <div
                    style={{
                        position: 'absolute',
                        left: `${shapeObj.x + width + 10}px`, // Adjusted to apply positioning
                        top: `${shapeObj.y - 15}px`,
                        display: 'flex',
                        gap: '10px', // Adds space between child components
                        backgroundColor: '#F3F3F3', // Light gray background, similar to MS Word's menu
                        padding: '10px', // Adds some padding inside the container for spacing
                        borderRadius: '5px', // Rounded corners for a softer look
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                        alignItems: 'center', // Ensures children are aligned in the center vertically
                        zIndex: 1000 // Ensures the menu appears above other content
                    }}
                >
                    {istextObj && <TextPropertiesMenu textObj={shapeObj as TextObj} itemType={null} />}
                    {issolidShapeObj && <ColorPicker solidShapeObj={shapeObj as SolidShapeObj} />}
                    <DeleteButton />
                </div>
            </PassInCanvasDesignProvider>
        </Html>
    );
};

export default EditMenu;

