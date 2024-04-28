import { ColorPicker, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';

interface TeamSettingsProps {
    label: string;
    hexColor: string;
    setHexColor: (hexColor: string) => void;
}

const TeamColorSelector = ({ hexColor, setHexColor, label }: TeamSettingsProps) => {

    const handleColorChange = (color: Color) => {
        setHexColor(color.toHexString());
    }

    return (
        <>
            <Typography.Text>{label}</Typography.Text>
            <ColorPicker
                value={hexColor}
                onChangeComplete={(color: Color) => handleColorChange(color)}
                disabledAlpha
            />
        </>
    )
};

export default TeamColorSelector;
