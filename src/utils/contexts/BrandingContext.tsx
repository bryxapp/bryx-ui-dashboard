// BryxUserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { BrandingInfo } from '../types/OrganizationInterfaces';

interface BrandingContextProps {
    displayName: string;
    setDisplayName: (displayName: string) => void;
    branding: BrandingInfo | undefined;
    setBranding: (branding: BrandingInfo | undefined) => void;
}

const BrandingContext = createContext<BrandingContextProps | undefined>(undefined);

export const useBrandingContext = () => {
    const context = useContext(BrandingContext);
    if (!context) {
        throw new Error("BrandingContext must be used within a BrandingProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const BrandingProvider: React.FC<Props> = ({ children }) => {
    const [displayName, setDisplayName] = React.useState<string>('BRYX bids');
    const [branding, setBranding] = React.useState<BrandingInfo | undefined>();

    return (
        <BrandingContext.Provider value={{ displayName, setDisplayName, branding, setBranding }}>
            {children}
        </BrandingContext.Provider>
    );
};