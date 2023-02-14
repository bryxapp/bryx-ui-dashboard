import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const FormTextField = ({ name, index }: any) => {
    return (
        <>
            <Typography variant="h6" sx={{ padding: 1 }}>
                {name}
            </Typography>
            <TextField
                key={index}
                type="text"
                label={name}
                name={name}
            />
            <div style={{ height: 15 }}></div>
        </>
    );
};

export default FormTextField;
