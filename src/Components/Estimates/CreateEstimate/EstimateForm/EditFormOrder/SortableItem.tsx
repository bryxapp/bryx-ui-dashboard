import React, { createContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
    DraggableSyntheticListeners,
    UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GoGrabber } from "react-icons/go";
import { useCanvasDesignContext } from "../../../../../utils/contexts/canvasDesignContext";
import { findShape } from "../../../../../utils/shapeManagementUtils";
import EstimateFormDateField from '../EstimateFormTextFields/EstimateFormDateField';
import EstimateFormEmailField from '../EstimateFormTextFields/EstimateFormEmailField';
import EstimateFormLongTextField from '../EstimateFormTextFields/EstimateFormLongTextField';
import EstimateFormPhoneField from '../EstimateFormTextFields/EstimateFormPhoneField';
import EstimateFormTextField from '../EstimateFormTextFields/EstimateFormShortTextField';
import { DateInputObj, EmailInputObj, LongTextInputObj, PhoneInputObj, ShapeObj, ShortTextInputObj, TableInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { Button, Card, Tooltip } from "antd";
import EstimateFormTable from "../EstimateFormTextFields/EstimateFormTable";

interface Props {
    id: UniqueIdentifier;
}

interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;
    ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
    attributes: {},
    listeners: undefined,
    ref() { }
});

export function SortableItem({ id }: PropsWithChildren<Props>) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({ id });
    const context = useMemo(
        () => ({
            attributes,
            listeners,
            ref: setActivatorNodeRef
        }),
        [attributes, listeners, setActivatorNodeRef]
    );
    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
        padding: 0,
        paddingLeft: "15px",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingRight: "15px",
    };

    const { canvasDesign } = useCanvasDesignContext();
    const shape = findShape(canvasDesign, id.toString()) as ShapeObj;
    const renderInputField = () => {
        switch (shape.type) {
            case "ShortTextInput":
                return (<EstimateFormTextField shortTextInputObj={shape as ShortTextInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + shape.id} disabled={true} />);
            case "EmailInput":
                return (<EstimateFormEmailField emailInputObj={shape as EmailInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + shape.id} disabled={true} />);
            case "LongTextInput":
                return (<EstimateFormLongTextField longTextInputObj={shape as LongTextInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + shape.id} disabled={true} />);
            case "PhoneInput":
                return (<EstimateFormPhoneField phoneInputObj={shape as PhoneInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + shape.id} disabled={true} />);
            case "DateInput":
                return (<EstimateFormDateField dateInputObj={shape as DateInputObj} formInputs={null} setFormInputs={() => { }} fieldValue={''} key={"parent" + shape.id} disabled={true} />)
            case "TableInput":
                return (<EstimateFormTable tableInputObj={shape as TableInputObj} formInputs={null} key={"parent" + shape.id} handleChange={() => { }} disabled={true} />)
            default:
                return null;
        }
    };

    return (
        <SortableItemContext.Provider value={context}>
            <Card ref={setNodeRef} style={style}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {renderInputField()}
                    <Tooltip title="Drag to reorder" placement="right">
                        <Button className="DragHandle" {...attributes} {...listeners} type="text">
                            <GoGrabber />
                        </Button>
                    </Tooltip>
                </div>
            </Card>
        </SortableItemContext.Provider>
    );
}
