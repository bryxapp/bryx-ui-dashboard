import { Alert } from 'antd';

interface Props {
    dataName: string;
}

const ErrorMessage = ({ dataName }: Props) => {
    return (
        <Alert
            type="error"
            message={`There was an error retrieving ${dataName} data. Please refresh to try again.`}
        />
    );
}

export default ErrorMessage;