// OrganizationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { OrganizationInfo } from '../types/OrganizationInterfaces';

interface OrganizationContextProps {
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
    const [organization, setOrganization] = React.useState<OrganizationInfo | undefined>(); // Initialize with undefined

    const setOrganizationValue = (newOrganization: OrganizationInfo | undefined) => {
        setOrganization(newOrganization);
    };

    return (
        <OrganizationContext.Provider value={{ organization, setOrganization: setOrganizationValue }}>
            {children}
        </OrganizationContext.Provider>
    );
};