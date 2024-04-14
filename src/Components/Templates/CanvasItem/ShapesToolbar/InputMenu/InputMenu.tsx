import { Menu } from 'antd';
import { DateInputObj, EmailInputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createDateInputObj, createEmailInputObj, createLongTextInputObj, createPhoneInputObj, createShortTextInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { mapTypeToIcon, mapTypeToTitle } from '../../../../../utils/iconUtils';

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
            'Phone',
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

    return (
        <>
            <Menu.Item
                key="emailInput"
                onClick={handleAddEmailInput}
                icon={mapTypeToIcon('EmailInput')}
            >
                {mapTypeToTitle('EmailInput')}
            </Menu.Item>
            <Menu.Item
                key="phoneInput"
                onClick={handleAddPhoneInput}
                icon={mapTypeToIcon('PhoneInput')}
            >
                {mapTypeToTitle('PhoneInput')}
            </Menu.Item>
            <Menu.Item
                key="shortTextInput"
                onClick={handleAddShortTextInput}
                icon={mapTypeToIcon('ShortTextInput')}
            >
                {mapTypeToTitle('ShortTextInput')}
            </Menu.Item>
            <Menu.Item
                key="longTextInput"
                onClick={handleAddLongTextInput}
                icon={mapTypeToIcon('LongTextInput')}
            >
                {mapTypeToTitle('LongTextInput')}
            </Menu.Item>
            <Menu.Item
                key="dateInput"
                onClick={handleAddDateInput}
                icon={mapTypeToIcon('DateInput')}
            >
                {mapTypeToTitle('DateInput')}
            </Menu.Item>
        </>
    );
};

export default InputMenu;