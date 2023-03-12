import List from '@mui/material/List';
import EstimateListItem from './EstimateListItem/EstimateListItem';
import { deleteEstimate } from '../../../../Utils/estimates-api';

const EstimatesList = ({ estimates, setEstimates }: any) => {

    const handleEstimateDelete = (estimatesId: string) => {
        deleteEstimate(estimatesId).then((response) => {
            setEstimates(estimates.filter((estimate: any) => estimate.id !== estimatesId));
        });
    };

    return (
        <List>
            {estimates.map((estimate: any) => (
                <EstimateListItem key={estimate.id} estimate={estimate} handleEstimateDelete={handleEstimateDelete} />
            ))}
        </List>
    );

};

export default EstimatesList;