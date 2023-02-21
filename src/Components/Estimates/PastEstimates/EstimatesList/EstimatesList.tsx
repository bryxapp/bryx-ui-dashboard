import List from '@mui/material/List';
import EstimateListItem from './EstimateListItem/EstimateListItem';
import { deleteEstimate } from '../../../../utils/estimates-api';

const EstimatesList = ({estimates, setEstimates}:any) => {

    const handleTemplateDelete = (estimatesId: string) => {
        deleteEstimate(estimatesId).then((response) => {
            setEstimates(estimates.filter((estimate: any) => estimate.id !== estimatesId));
        });
    };

    return (
        <List>
            {estimates.map((estimate:any) => (
                <EstimateListItem estimate={estimate} handleTemplateDelete={handleTemplateDelete} />
            ))}
        </List>
    );

};

export default EstimatesList;