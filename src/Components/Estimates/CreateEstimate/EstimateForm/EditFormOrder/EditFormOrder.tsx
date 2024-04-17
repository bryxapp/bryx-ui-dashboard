import { Button, message } from "antd";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";
import { useState } from "react";
import { SortableList } from "./SortableList";
import { useAuth0User } from "../../../../../utils/customHooks/useAuth0User";
import { updateTemplate } from "../../../../../utils/api/templates-api";

interface IEstimateFormProps {
    setEditing: any;
    templateId: string;
    friendlyName: string;
}

const EditFormOrder = ({ setEditing, templateId, friendlyName }: IEstimateFormProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [items, setItems] = useState(canvasDesign.inputOrder.map((id) => ({ id })));
    const [loading, setLoading] = useState(false);
    const { getAccessToken } = useAuth0User();

    const handeSaveOrder = async () => {
        try {
            setLoading(true);
            //TODO save to database
            const token = await getAccessToken()
            if (!token) return;
            await updateTemplate(templateId, canvasDesign, friendlyName, token);
            message.success({
                content: "Input order saved",
                duration: 3, // Duration in seconds
            });
        } catch (error) {
            message.error({
                content: "Error saving input order",
                duration: 3, // Duration in seconds
            });
        }
        finally {
            setEditing(false);
            setLoading(false);
        }
    }

    const handleOrderChange = (newItems: any) => {
        setItems(newItems);
        setCanvasDesign({
            ...canvasDesign,
            inputOrder: newItems.map((item: any) => item.id),
        });
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handeSaveOrder} disabled={loading}>Save</Button>
                <div style={{ width: '5px' }} />
                <Button type="primary" danger onClick={() => setEditing(false)} disabled={loading}>Cancel</Button>
            </div>
            <div style={{ height: '10px' }} />
            <div>
                <SortableList
                    items={items}
                    onChange={handleOrderChange}
                    renderItem={(item: { id: any; }) => (
                        <SortableList.Item id={item.id} />
                    )}
                />
                <div style={{ height: '10px' }} />
            </div>
        </div>
    );
};

export default EditFormOrder;
