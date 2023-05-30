import List from '@mui/material/List';
import EstimateDraftsListItem from './EstimateDraftsListItem/EstimateDraftsListItem';
import { deleteEstimate } from '../../../../utils/estimates-api';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';

interface EstimateDraftsListProps {
    estimateDrafts: EstimateData[];
    setEstimateDrafts: React.Dispatch<React.SetStateAction<any>>;
}
const EstimateDraftsList = ({ estimateDrafts, setEstimateDrafts }: EstimateDraftsListProps) => {

    const handleEstimateDraftDelete = (estimateDraftId: string) => {
        deleteEstimate(estimateDraftId).then(() => {
            setEstimateDrafts(estimateDrafts.filter((estimateDraft: any) => estimateDraft.id !== estimateDraftId));
        });
    };

    return (
        <List>
            {estimateDrafts.map((estimateDraft: any) => (
                <EstimateDraftsListItem key={estimateDraft.id} estimateDraft={estimateDraft} handleEstimateDraftDelete={handleEstimateDraftDelete} />
            ))}
        </List>
    );

};

export default EstimateDraftsList;