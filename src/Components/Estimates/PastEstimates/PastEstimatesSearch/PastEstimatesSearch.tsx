import { useEffect, useState } from "react";
import { Button, DatePicker, Input, message } from "antd";
import dayjs, { Dayjs } from "dayjs";  // Ensure Dayjs is correctly imported
import TemplatesDropdown from "./TemplatesDropdown/TemplatesDropdown";
import { useAuth0User } from "../../../../utils/customHooks/useAuth0User";
import { getEstimates } from "../../../../utils/api/estimates-api";
import logger from "../../../../logging/logger";

interface PastEstimatesSearchProps {
    pageNumber: number;
    pageSize: number;
    setEstimates: (estimates: any) => void;
    setMaxEstimatesReached: (maxEstimatesReached: boolean) => void;
    setEstimateRequestCompleted: (completed: boolean) => void;
}

const PastEstimatesSearch = ({
    pageNumber,
    pageSize,
    setEstimates,
    setMaxEstimatesReached,
    setEstimateRequestCompleted
}: PastEstimatesSearchProps) => {
    const { getAccessToken } = useAuth0User();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const [noEstimatesAvailable, setNoEstimatesAvailable] = useState<boolean>(false);
    const disabled = noEstimatesAvailable && searchTerm.length === 0 && dateRange.every(date => date === null) && selectedTemplateId === '';

    const searchEstimates = async () => {
        setNoEstimatesAvailable(false);
        setEstimateRequestCompleted(false);
        try {
            const token = await getAccessToken();
            if (!token) return;
            const estimateData = await getEstimates(pageSize, pageNumber, token, searchTerm, selectedTemplateId, dateRange);
            setEstimates(estimateData.estimates);
            setMaxEstimatesReached(estimateData.maxEstimatesReached);
            setNoEstimatesAvailable(estimateData.estimates.length === 0);
            setEstimateRequestCompleted(true);
        } catch (error: any) {
            logger.trackException({
                properties: {
                    name: 'Estimate Retrieval Error',
                    page: 'Past Estimates',
                    description: 'Error retrieving estimates',
                    error: JSON.stringify(error),
                },
            });
            setNoEstimatesAvailable(true);
            setEstimateRequestCompleted(true);
            message.error('Error retrieving estimates.');
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setNoEstimatesAvailable(false);
                setEstimateRequestCompleted(false);
                const token = await getAccessToken();
                if (!token) return;
                const estimateData = await getEstimates(pageSize, pageNumber, token);
                setEstimates(estimateData.estimates);
                setMaxEstimatesReached(estimateData.maxEstimatesReached);
                setNoEstimatesAvailable(estimateData.estimates.length === 0);
                setEstimateRequestCompleted(true);

            } catch (error: any) {
                logger.trackException({
                    properties: {
                        name: 'Estimates Loading Error',
                        page: 'Past Estimates',
                        description: 'Error loading estimates',
                        error: JSON.stringify(error),
                    },
                });
                setNoEstimatesAvailable(true);
                setEstimateRequestCompleted(true);
                message.error('Error loading estimates.');
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAccessToken, pageSize, pageNumber]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates ?? [null, null]);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: '30rem' }}>
                <Input
                    id="outlined-search"
                    disabled={disabled}
                    placeholder="Search Estimates"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "100%" }}
                />
            </div>
            <div style={{ width: '18rem' }}>
                <DatePicker.RangePicker
                    disabled={disabled}
                    value={dateRange}
                    onChange={handleRangeChange}
                    allowClear
                    format="MM/DD/YYYY"
                    disabledDate={(currentDate) => currentDate && currentDate.isAfter(dayjs().endOf('day'))}
                />
            </div>
            <div>
                <TemplatesDropdown
                    disabled={disabled}
                    selectedTemplateId={selectedTemplateId}
                    setSelectedTemplateId={setSelectedTemplateId}
                />
            </div>
            <div style={{ width: '10rem' }}>
                <Button type="primary" onClick={searchEstimates}>Search</Button>
            </div>
        </div>
    );
};

export default PastEstimatesSearch;