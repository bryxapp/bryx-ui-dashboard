import { Button, useTheme } from '@mui/material';
import { darken } from '@mui/system';

interface AuthButtonProps {
    onClick: () => void;
    text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, text }) => {
    const theme = useTheme();

    return (
        <Button
            onClick={onClick}
            color='primary'
            sx={{
                fontSize: '14px',
                padding: '10px 20px', // Common padding values
                minWidth: '100px',
                borderRadius: '4px', // Common border radius
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor: darken(theme.palette.secondary.main, 0.1),
                }
            }}
        >
            {text}
        </Button>
    );
};

export default AuthButton;
