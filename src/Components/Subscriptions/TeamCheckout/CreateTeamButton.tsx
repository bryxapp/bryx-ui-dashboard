import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
    closeDialog: () => void;
}

const CreateTeamButton = ({ closeDialog }: Props) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        closeDialog();
        navigate('/createTeam');        
    };
    return (
        <Button variant="contained" color="primary" size="large" onClick={handleClick}>
            Create Team
        </Button>
    );
}

export default CreateTeamButton;