import { Menu } from 'antd';
import { DateInputObj, EmailInputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj, TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createDateInputObj, createEmailInputObj, createLongTextInputObj, createPhoneInputObj, createShortTextInputObj, createTableInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdShortText } from "react-icons/md";
import { MdNotes } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { TableOutlined } from "@ant-design/icons";

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

    const handleAddLongTextInput = () => {
        const newLongTextInput: LongTextInputObj = createLongTextInputObj(
            'Input',
            true,
            'Long Text',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newLongTextInput],
        });
    }

    const handleAddDateInput = () => {
        const newDateInput: DateInputObj = createDateInputObj(
            'Date',
            true,
            'mm/dd/yyyy',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newDateInput],
        });
    }

    const handleAddTableInput = () => {
        const newTableInput: TableInputObj = createTableInputObj(
            'Table',
            true,
            'Table',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTableInput],
        });
    }

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
            <Menu.Item
                key="longTextInput"
                onClick={handleAddLongTextInput}
                icon={<MdNotes />}
            >
                Long Text
            </Menu.Item>
            <Menu.Item
                key="dateInput"
                onClick={handleAddDateInput}
                icon={<MdCalendarMonth />}
            >
                Date
            </Menu.Item>
            <Menu.Item
                key="tableInput"
                onClick={handleAddTableInput}
                icon={<TableOutlined />}
            >
                Table
            </Menu.Item>
        </>
    );
};

export default InputMenu;