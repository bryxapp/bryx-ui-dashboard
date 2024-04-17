import { Button, message } from "antd";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";
import { useState } from "react";
import { SortableList } from "./SortableList";

interface IEstimateFormProps {
    setEditing: any;
}

const EditFormOrder = ({
    setEditing }: IEstimateFormProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [items, setItems] = useState(canvasDesign.inputOrder.map((id) => ({ id })));

    const handeSaveOrder = () => {

        try {
            setCanvasDesign((prevCanvasDesign) => {
                let newCanvasDesign = { ...prevCanvasDesign };
                newCanvasDesign.inputOrder = items.map((item) => item.id);
                return newCanvasDesign;
            });
            //TODO save to database

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
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handeSaveOrder}>Save</Button>
                <div style={{ width: '5px' }} />
                <Button type="primary" danger onClick={() => setEditing(false)}>Cancel</Button>
            </div>
            <div style={{ height: '10px' }} />
            <div>
                <SortableList
                    items={items}
                    onChange={setItems}
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
