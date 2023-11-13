import { Button, useTheme } from '@mui/material';
import { lighten } from '@mui/system';

interface AuthButtonProps {
    onClick: () => void;
    text: string;
    startIcon?: React.ReactNode;
    color: 'primary' | 'secondary';
    fontSize?: number; // Make fontSize optional
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
    onClick, 
    text, 
    startIcon, 
    color, 
    fontSize = 1.5 // Default value for fontSize
}) => {
    const theme = useTheme();
    const backgroundColor = theme.palette[color].main; // Simplified
    const textColor = theme.palette[color].contrastText; // Improved for accessibility

    return (
        <Button
            onClick={onClick}
            startIcon={startIcon}
            sx={{
                fontSize: `${fontSize}rem`,
                padding: theme.spacing(1), // Using theme's spacing
                margin: theme.spacing(1),
                minWidth: `${(fontSize * 100)+50}px`,
                backgroundColor,
                color: textColor, // Use textColor for better contrast
                '&:hover': {
                    backgroundColor: lighten(backgroundColor, 0.1),
                }
            }}
        >
            {text}
        </Button>
    );
};

export default AuthButton;