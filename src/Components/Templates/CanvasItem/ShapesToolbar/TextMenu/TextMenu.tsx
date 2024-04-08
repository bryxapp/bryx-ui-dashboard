import { Menu } from 'antd';
import { EmailInputObj, HeadingObj, ParagraphObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createEmailInputObj, createHeadingdObj, createParagraphObj, createPhoneInputObj, createShortTextInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { PlusOutlined } from '@ant-design/icons';


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

    const handleAddEmailInput = () => {
        const newEmailInput: EmailInputObj = createEmailInputObj(
            'Email',
            true,
            'john.doe@email.com',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEmailInput],
        });
    };

    const handleAddPhoneInput = () => {
        const newPhoneInput: PhoneInputObj = createPhoneInputObj(
            'Phone Number #',
            true,
            '(555)555-5555',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newPhoneInput],
        });
    };

    const handleAddShortTextInput = () => {
        const newShortTextInput: ShortTextInputObj = createShortTextInputObj(
            'Input',
            true,
            'Short Text',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newShortTextInput],
        });
    };

    return (

        <>
            <Menu.Item
                key="heading"
                onClick={handleAddHeading}
                icon={<PlusOutlined />}
            >
                Heading
            </Menu.Item>
            <Menu.Item
                key="paragraph"
                onClick={handleAddParagraph}
                icon={<PlusOutlined />}
            >
                Paragraph
            </Menu.Item>
            <Menu.Item
                key="emailInput"
                onClick={handleAddEmailInput}
                icon={<PlusOutlined />}
            >
                Email Input
            </Menu.Item>
            <Menu.Item
                key="phoneInput"
                onClick={handleAddPhoneInput}
                icon={<PlusOutlined />}
            >
                Phone Input
            </Menu.Item>
            <Menu.Item
                key="shortTextInput"
                onClick={handleAddShortTextInput}
                icon={<PlusOutlined />}
            >
                Short Text Input
            </Menu.Item>
        </>
    );
};

export default TextMenu;