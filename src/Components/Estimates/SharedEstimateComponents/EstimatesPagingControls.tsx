import React from "react";
import { Tooltip, Button, Typography } from "antd";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";

interface EstimatesPagingControlsProps {
    estimates: EstimateData[];
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    PAGE_SIZE: number;
}

const EstimatesPagingControls: React.FC<EstimatesPagingControlsProps> = ({ estimates, pageNumber, setPageNumber, PAGE_SIZE }) => {

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    };

    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = estimates.length >= PAGE_SIZE;

    if (!hasPreviousPage && !hasNextPage) {
        return null;
    }

    return (
        <div>
            <Tooltip title={hasPreviousPage ? "Go to previous page" : "No previous pages"}>
                <Button
                    disabled={!hasPreviousPage}
                    onClick={() => handlePageChange(pageNumber - 1)}
                >
                    {"<"}
                </Button>
            </Tooltip>
            <Typography.Text type="secondary">{pageNumber}</Typography.Text>
            <Tooltip title={hasNextPage ? "Go to next page" : "No additional pages"}>
                <Button
                    disabled={!hasNextPage}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {">"}
                </Button>
            </Tooltip>
        </div>
    );
};

export default EstimatesPagingControls;