import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { useState } from 'react';
import { SortableList } from './SortableList';


const EditingEstimateFormTextFieldsList = () => {
    const { canvasDesign } = useCanvasDesignContext();

    function getMockItems() {
        return canvasDesign.inputOrder.map((id) => ({ id }));
    }

    const [items, setItems] = useState(getMockItems);

    return (
        <SortableList
            items={items}
            onChange={setItems}
            renderItem={(item) => (
                <SortableList.Item id={item.id} />
            )}
        />
    );
};

export default EditingEstimateFormTextFieldsList;

