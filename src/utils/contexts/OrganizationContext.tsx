// OrganizationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { OrganizationInfo } from '../types/OrganizationInterfaces';

interface OrganizationContextProps {
    isOwner: boolean;
    setIsOwner: (isOwner: boolean) => void;
    organization: OrganizationInfo | undefined;
    setOrganization: (organization: OrganizationInfo | undefined) => void;
}

const OrganizationContext = createContext<OrganizationContextProps | undefined>(undefined);

export const useOrganizationContext = () => {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error("useOrganizationContext must be used within a OrganizationProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const OrganizationProvider: React.FC<Props> = ({ children }) => {
    const [organization, setOrganization] = React.useState<OrganizationInfo | undefined>();
    const [isOwner, setIsOwner] = React.useState(false);

    const setOrganizationValue = (newOrganization: OrganizationInfo | undefined) => {
        setOrganization(newOrganization);
    };

    const setIsOwnerValue = (newIsOwner: boolean) => {
        setIsOwner(newIsOwner);
    }

    return (
        <OrganizationContext.Provider value={{ organization, setOrganization: setOrganizationValue, isOwner, setIsOwner:setIsOwnerValue }}>
            {children}
        </OrganizationContext.Provider>
    );
};