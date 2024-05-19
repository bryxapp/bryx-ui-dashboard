import { Menu } from 'antd';
import { HeadingObj, ParagraphObj } from '../../../../../utils/types/CanvasInterfaces';
import { createHeadingdObj, createParagraphObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { mapTypeToIcon, mapTypeToTitle } from '../../../../../utils/iconUtils';


const TextMenu = () => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleAddHeading = () => {
        const newHeading: HeadingObj = createHeadingdObj('Heading', 28, 'black', 'Arial', 'bold', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading],
        });
    };

    const handleAddLabel = () => {
        const newHeading: HeadingObj = createHeadingdObj('Label', 20, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading],
        });
    };

    const handleAddParagraph = () => {
        const newParagraph: ParagraphObj = createParagraphObj('Paragraph', 12, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newParagraph],
        });
    };

    return (

        <>
            <Menu.Item
                key="heading"
                onClick={handleAddHeading}
                icon={mapTypeToIcon('Heading')}
            >
                {mapTypeToTitle('Heading')}
            </Menu.Item>
            <Menu.Item
                key="label"
                onClick={handleAddLabel}
                icon={mapTypeToIcon('Label')}
            >
                {mapTypeToTitle('Label')}
            </Menu.Item>
            <Menu.Item
                key="paragraph"
                onClick={handleAddParagraph}
                icon={mapTypeToIcon('Paragraph')}
            >
                {mapTypeToTitle('Paragraph')}
            </Menu.Item>
        </>
    );
};

export default TextMenu;