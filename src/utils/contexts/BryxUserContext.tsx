// BryxUserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { BryxUserInfo } from '../types/BryxUserInterfaces';

interface BryxUserContextProps {
    bryxUser: BryxUserInfo | undefined;
    setBryxUser: (bryxUser: BryxUserInfo | undefined) => void;
}

const BryxUserContext = createContext<BryxUserContextProps | undefined>(undefined);

export const useBryxUserContext = () => {
    const context = useContext(BryxUserContext);
    if (!context) {
        throw new Error("useBryxUserContext must be used within a BryxUserProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const BryxUserProvider: React.FC<Props> = ({ children }) => {
    const [bryxUser, setBryxUser] = React.useState<BryxUserInfo | undefined>(undefined);
    
    const setBryxUserValue = (bryxUser: BryxUserInfo | undefined) => {
        setBryxUser(bryxUser);
    };

    return (
        <BryxUserContext.Provider value={{ bryxUser, setBryxUser: setBryxUserValue }}>
            {children}
        </BryxUserContext.Provider>
    );
};