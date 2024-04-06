import React, { useState } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import {MdTextFields as TextFieldsIcon} from 'react-icons/md';
import { EmailInputObj, HeadingObj, ParagraphObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createEmailInputObj, createHeadingdObj, createParagraphObj, createPhoneInputObj, createShortTextInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { PlusOutlined } from '@ant-design/icons';

interface TextMenuProps {
    isLoading: boolean;
}

const TextMenu: React.FC<TextMenuProps> = ({ isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleVisibleChange = (open: boolean) => {
        if (!isLoading) {
            setOpen(open);
        }
    };

    const handleAddHeading = () => {
        setOpen(false);
        const newHeading: HeadingObj = createHeadingdObj('Heading', 20, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading],
        });
    };

    const handleAddParagraph = () => {
        setOpen(false);
        const newParagraph: ParagraphObj = createParagraphObj('Paragraph', 12, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newParagraph],
        });
    };

    const handleAddEmailInput = () => {
        setOpen(false);
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
        setOpen(false);
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
        setOpen(false);
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



    const items: MenuProps['items'] = [
        {
            key: 'heading',
            label: 'Heading',
            icon: <PlusOutlined />,
            onClick: handleAddHeading,
        },
        {
            key: 'paragraph',
            label: 'Paragraph',
            icon: <PlusOutlined />,
            onClick: handleAddParagraph,
        },
        {
            key: 'emailInput',
            label: 'Email Input',
            icon: <PlusOutlined />,
            onClick: handleAddEmailInput,
        },
        {
            key: 'phoneInput',
            label: 'Phone Input',
            icon: <PlusOutlined />,
            onClick: handleAddPhoneInput,
        },
        {
            key: 'shortTextInput',
            label: 'Short Text Input',
            icon: <PlusOutlined />,
            onClick: handleAddShortTextInput,
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            onOpenChange={handleVisibleChange}
            open={open} trigger={['click']}
            disabled={isLoading}>
            <Button size="large" icon={<TextFieldsIcon />} />
        </Dropdown>
    );
};

export default TextMenu;