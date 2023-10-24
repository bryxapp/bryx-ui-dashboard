import { Button, useTheme } from '@mui/material';
import { lighten } from '@mui/system';

interface AuthButtonProps {
    onClick: () => void;
    text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, text }) => {
    const theme = useTheme();

    return (
        <Button
            onClick={onClick}
            color='secondary'
            sx={{
                fontSize: '1.5rem',
                padding: '10px',
                margin: '10px',
                minWidth: '200px',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: lighten(theme.palette.primary.main, 0.1),
                }
            }}
        >
            {text}
        </Button>
    );
};

export default AuthButton;
