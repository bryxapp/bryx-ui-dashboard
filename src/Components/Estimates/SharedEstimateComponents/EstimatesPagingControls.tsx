
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Typography, useTheme } from "@mui/material";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";

interface EstimatesPagingControlsProps {
    estimates: EstimateData[];
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    PAGE_SIZE: number;
}

const EstimatesPagingControls = ({ estimates, pageNumber, setPageNumber, PAGE_SIZE }: EstimatesPagingControlsProps) => {
    const theme = useTheme();

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    };

    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = estimates.length >= PAGE_SIZE;

    return (
            <div>
                <Tooltip title={hasPreviousPage ? "Go to previous page" : "No previous pages"}>
                    <span>
                        <Button
                            disabled={!hasPreviousPage}
                            onClick={() => handlePageChange(pageNumber - 1)}
                            sx={{
                                color: theme.palette.secondary.main
                            }}
                        >
                            {"<"}
                        </Button>
                    </span>
                </Tooltip>
                <Typography variant="body1" component='span' sx={{
                    color: theme.palette.secondary.main
                }}>
                    {pageNumber}
                </Typography>

                <Tooltip title={hasNextPage ? "Go to next page" : "No additional pages"}>
                    <span>
                        <Button
                            disabled={!hasNextPage}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            sx={{
                                color: theme.palette.secondary.main
                            }}
                        >
                            {">"}
                        </Button>
                    </span>
                </Tooltip>
            </div>
    );
};

export default EstimatesPagingControls;