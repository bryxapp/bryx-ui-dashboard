import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const formData = [
    {
        type: "text",
        name: "Full Name",
        required: true
    },
    {
        type: "email",
        name: "Email",
        required: true
    },
    {
        type: "tel",
        name: "Phone Number",
        required: true
    },
    {
        type: "text",
        name: "Address",
        required: false
    }
];

const Form = () => {
    return (
        <>
            <Typography variant="h3" color="primary">
                Fill Out Form
            </Typography>
            {formData.map(({ type, name, required }: any, index: any) => (
                <>
                    <Typography variant="h6" sx={{ padding: 1 }}>
                        {name}
                    </Typography>
                    <TextField
                        key={index}
                        type={type}
                        label={name}
                        name={name}
                        required={required}
                    />
                    <div style={{ height: 15 }}></div>
                </>
            ))}
        </>
    );
};

export default Form;
