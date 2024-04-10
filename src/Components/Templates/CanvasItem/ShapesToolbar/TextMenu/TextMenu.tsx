import { Menu } from 'antd';
import { HeadingObj, ParagraphObj } from '../../../../../utils/types/CanvasInterfaces';
import { createHeadingdObj, createParagraphObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { FaHeading } from "react-icons/fa6";
import { BsTextParagraph } from "react-icons/bs";


const TextMenu = () => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleAddHeading = () => {
        const newHeading: HeadingObj = createHeadingdObj('Heading', 20, 'black', 'Arial', 'normal', '');
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
                icon={<FaHeading />}
            >
                Heading
            </Menu.Item>
            <Menu.Item
                key="paragraph"
                onClick={handleAddParagraph}
                icon={<BsTextParagraph />}
            >
                Paragraph
            </Menu.Item>
        </>
    );
};

export default TextMenu;