import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
    closeDialog: () => void;
}

const CreateTeamButton = ({ closeDialog }: Props) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        closeDialog();
        navigate('/create-team');
    };
    return (
        <Button type="primary" size="large" onClick={handleClick}>
            Create Team
        </Button>
    );
}

export default CreateTeamButton;

