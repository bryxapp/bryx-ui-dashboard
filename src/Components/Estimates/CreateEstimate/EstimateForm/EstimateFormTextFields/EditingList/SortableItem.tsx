import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
    DraggableSyntheticListeners,
    UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GoGrabber } from "react-icons/go";
import { useCanvasDesignContext } from "../../../../../../utils/contexts/canvasDesignContext";
import { findShape } from "../../../../../../utils/shapeManagementUtils";
import EstimateFormDateField from '../EstimateFormDateField';
import EstimateFormEmailField from '../EstimateFormEmailField';
import EstimateFormLongTextField from '../EstimateFormLongTextField';
import EstimateFormPhoneField from '../EstimateFormPhoneField';
import EstimateFormTextField from '../EstimateFormShortTextField';
import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from "../../../../../../utils/types/CanvasInterfaces";
import { Button, Card } from "antd";

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
        transition
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
                return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} handleChange={() => { }} fieldValue={''} key={"parent" + inputObj.id} disabled={true} />)
            default:
                return null;
        }
    };

    return (
        <SortableItemContext.Provider value={context}>
            <li className="SortableItem" ref={setNodeRef} style={style}>
                <Card>
                    {renderInputField()}
                    <DragHandle />
                </Card>
            </li>
        </SortableItemContext.Provider>
    );
}

export function DragHandle() {
    const { attributes, listeners, ref } = useContext(SortableItemContext);
    return (
        <Button className="DragHandle" {...attributes} {...listeners} ref={ref}>
            <GoGrabber />
        </Button>
    );
}
