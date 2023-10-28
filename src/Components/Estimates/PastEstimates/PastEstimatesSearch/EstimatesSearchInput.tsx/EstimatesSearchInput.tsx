import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";

interface EstimatesSearchInputProps {
    disabled: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

const EstimatesSearchInput = ({ disabled, searchTerm, setSearchTerm, }: EstimatesSearchInputProps) => {

    const theme = useTheme();

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
            <div style={{ flex: "1" }}>
                <TextField
                    id="outlined-search"
                    disabled={disabled}
                    label="Search Estimates"
                    type="search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "100%" }} // make search box wider
                    InputLabelProps={{
                        style: { color: !disabled ? theme.palette.text.primary : theme.palette.text.secondary } // change the color to your desired color
                    }}
                />
            </div>
    );
};

export default EstimatesSearchInput;