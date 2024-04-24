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
import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { Button, Card, Tooltip } from "antd";

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
    const inputObj = findShape(canvasDesign, id.toString()) as InputObj;
    const renderInputField = () => {
        switch (inputObj.type) {
            case "ShortTextInput":
                return (<EstimateFormTextField shortTextInputObj={inputObj as ShortTextInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />);
            case "EmailInput":
                return (<EstimateFormEmailField emailInputObj={inputObj as EmailInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />);
            case "LongTextInput":
                return (<EstimateFormLongTextField longTextInputObj={inputObj as LongTextInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />);
            case "PhoneInput":
                return (<EstimateFormPhoneField phoneInputObj={inputObj as PhoneInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />);
            case "DateInput":
                return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} formInputs={null} setFormInputs={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />)
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
