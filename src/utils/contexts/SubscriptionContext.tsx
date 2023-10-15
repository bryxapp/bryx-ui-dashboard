// SubscriptionContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { SubscriptionInfo } from '../types/SubscriptionInterfaces';

interface SubscriptionContextProps {
    subscription: SubscriptionInfo | undefined; // Update the type to match SubscriptionInfo
    setSubscription: (subscription: SubscriptionInfo | undefined) => void; // Update the argument type
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

export const useSubscriptionContext = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscriptionContext must be used within a SubscriptionProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const SubscriptionProvider: React.FC<Props> = ({ children }) => {
    const [subscription, setSubscription] = React.useState<SubscriptionInfo | undefined>(); // Initialize with undefined
    
    const setSubscriptionValue = (newSubscription: SubscriptionInfo | undefined) => {
        setSubscription(newSubscription);
    };

    return (
        <SubscriptionContext.Provider value={{ subscription, setSubscription: setSubscriptionValue }}>
            {children}
        </SubscriptionContext.Provider>
    );
};