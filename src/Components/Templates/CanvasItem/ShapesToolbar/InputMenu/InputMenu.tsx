import { Menu } from 'antd';
import { DateInputObj, EmailInputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj, TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createDateInputObj, createEmailInputObj, createLongTextInputObj, createPhoneInputObj, createShortTextInputObj, createTableInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { mapTypeToIcon, mapTypeToTitle } from '../../../../../utils/iconUtils';

const InputMenu = () => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleAddEmailInput = () => {
        console.log(canvasDesign)
        const newEmailInput: EmailInputObj = createEmailInputObj(
            'Email',
            true,
            '',
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
            inputOrder: [...canvasDesign.inputOrder, newEmailInput.id],
        });
    };

    const handleAddPhoneInput = () => {
        const newPhoneInput: PhoneInputObj = createPhoneInputObj(
            'Phone',
            true,
            '',
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
            inputOrder: [...canvasDesign.inputOrder, newPhoneInput.id],
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
            inputOrder: [...canvasDesign.inputOrder, newShortTextInput.id],
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
            inputOrder: [...canvasDesign.inputOrder, newLongTextInput.id],
        });
    }

    const handleAddDateInput = () => {
        const newDateInput: DateInputObj = createDateInputObj(
            'Date',
            true,
            '',
            20,
            'black',
            'Arial',
            'normal',
            '',
            'MM/dd/yy',
            false,
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newDateInput],
            inputOrder: [...canvasDesign.inputOrder, newDateInput.id],
        });
    }

    const handleAddTableInput = () => {
        const newTableInput: TableInputObj = createTableInputObj(
            3,
            3,
            100,
            50,
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTableInput],
            inputOrder: [...canvasDesign.inputOrder, newTableInput.id],
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
                key="dateInput"
                onClick={handleAddDateInput}
                icon={mapTypeToIcon('DateInput')}
            >
                {mapTypeToTitle('DateInput')}
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
                key="tableInput"
                onClick={handleAddTableInput}
                icon={mapTypeToIcon('TableInput')}
            >
                {mapTypeToTitle('TableInput')}
            </Menu.Item>
        </>
    );
};

export default InputMenu;