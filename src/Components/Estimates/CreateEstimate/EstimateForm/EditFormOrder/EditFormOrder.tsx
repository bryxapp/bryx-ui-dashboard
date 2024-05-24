import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";
import { useState } from "react";
import { SortableList } from "./SortableList";
import { SortableItem } from "./SortableItem";
import EstimateName from "../EstimateName/EstimateName";

interface IEstimateFormProps {
    templateId: string;
    templateFriendlyName: string;
    editing: boolean;
    setEditing: any;
    estimateName: string;
    setEstimateName: any;
}

const EditFormOrder = ({ setEditing, templateId, templateFriendlyName, editing, estimateName, setEstimateName }: IEstimateFormProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [items, setItems] = useState(canvasDesign.inputOrder.map((id) => ({ id })));
    const handleOrderChange = (newItems: any) => {
        setItems(newItems);
        setCanvasDesign({
            ...canvasDesign,
            inputOrder: newItems.map((item: any) => item.id),
        });
    }

    return (
        <div>
            <EstimateName
                estimateName={estimateName}
                setEstimateName={setEstimateName}
                editing={editing}
                setEditing={setEditing}
                templateId={templateId}
                templateFriendlyName={templateFriendlyName} />
            <SortableList
                items={items}
                onChange={handleOrderChange}
                renderItem={(item: { id: any; }) => (
                    <SortableItem id={item.id} />
                )}
            />
        </div>
    );
};

export default EditFormOrder;
