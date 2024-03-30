import { useEffect } from 'react';
import { message } from 'antd';

interface Props {
    error: boolean;
    setError: (error: boolean) => void;
    content: string | null
}

const ErrorModal = ({ error, setError, content }: Props) => {
    useEffect(() => {
        if (error) {
            // Display the error message
            message.error({
                content: content ? content : 'An error occurred.',
                duration: 6, // Duration in seconds
                onClose: () => setError(false), // Reset the error state when the message is closed
            });
        }
    }, [content, error, setError]);

    return null; // This component doesn't render anything itself
};

export default ErrorModal;
