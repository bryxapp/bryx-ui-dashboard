import { Menu } from 'antd';
import { EmailInputObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createEmailInputObj, createPhoneInputObj, createShortTextInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdShortText } from "react-icons/md";



const InputMenu = () => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

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
                key="emailInput"
                onClick={handleAddEmailInput}
                icon={<MdOutlineEmail />}
            >
                Email
            </Menu.Item>
            <Menu.Item
                key="phoneInput"
                onClick={handleAddPhoneInput}
                icon={<MdLocalPhone />}
            >
                Phone
            </Menu.Item>
            <Menu.Item
                key="shortTextInput"
                onClick={handleAddShortTextInput}
                icon={<MdShortText />}
            >
                Short Text
            </Menu.Item>
        </>
    );
};

export default InputMenu;