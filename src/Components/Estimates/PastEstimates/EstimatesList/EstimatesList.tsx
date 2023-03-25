import List from '@mui/material/List';
import EstimateListItem from './EstimateListItem/EstimateListItem';
import { deleteEstimate } from '../../../../utils/estimates-api';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';

interface EstimatesListProps {
    estimates: EstimateData[];
    setEstimates: React.Dispatch<React.SetStateAction<any>>;
}
const EstimatesList = ({ estimates, setEstimates }: EstimatesListProps) => {

    const handleEstimateDelete = (estimatesId: string) => {
        deleteEstimate(estimatesId).then(() => {
            setEstimates(estimates.filter((estimate: EstimateData) => estimate.id !== estimatesId));
        });
    };

    return (
        <List>
            {estimates.map((estimate: EstimateData) => (
                <EstimateListItem key={estimate.id} estimate={estimate} handleEstimateDelete={handleEstimateDelete} />
            ))}
        </List>
    );

};

export default EstimatesList;