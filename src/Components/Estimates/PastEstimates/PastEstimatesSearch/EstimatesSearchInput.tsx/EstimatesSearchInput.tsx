import React from "react";
import { Input } from "antd";

interface EstimatesSearchInputProps {
    disabled: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

const EstimatesSearchInput: React.FC<EstimatesSearchInputProps> = ({ disabled, searchTerm, setSearchTerm }) => {

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{ flex: "1" }}>
            <Input
                id="outlined-search"
                disabled={disabled}
                placeholder="Search Estimates"
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                style={{ width: "100%" }} // make search box wider
            />
        </div>
    );
};

export default EstimatesSearchInput;