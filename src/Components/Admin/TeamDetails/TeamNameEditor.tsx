import {
    Input,
    Typography,
} from 'antd';

interface TeamNameEditorProps {
    newTeamName: string;
    setNewTeamName: (newTeamName: string) => void;
    isValidTeamName: boolean;
    setIsValidTeamName: (isValidTeamName: boolean) => void;
}

const TeamNameEditor = ({ newTeamName, setNewTeamName, isValidTeamName, setIsValidTeamName }: TeamNameEditorProps) => {
    const handleTeamNameChange = (event: any) => {
        const enteredTeamName = event.target.value;
        setNewTeamName(enteredTeamName);
        setIsValidTeamName(enteredTeamName.length > 0);
    };

    return (
        <>
        <Typography.Text strong>Team Name</Typography.Text>
            <Input
                autoFocus
                placeholder="Team Name"
                value={newTeamName}
                onChange={handleTeamNameChange}
                className={!isValidTeamName ? 'ant-input-error' : ''}
            />
            {!isValidTeamName && <Typography.Text type="danger">Team Name cannot be empty</Typography.Text>}
        </>
    );
};

export default TeamNameEditor;
