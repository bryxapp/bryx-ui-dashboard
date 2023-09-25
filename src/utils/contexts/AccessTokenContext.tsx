// AccessTokenContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface AccessTokenContextProps {
    token: string | null;
    expiry: number | null;
    setTokenAndExpiry: (token: string, expiry: number) => void;
}

const AccessTokenContext = createContext<AccessTokenContextProps | undefined>(undefined);

export const useAccessTokenContext = () => {
    const context = useContext(AccessTokenContext);
    if (!context) {
        throw new Error("useAccessTokenContext must be used within an AccessTokenProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const AccessTokenProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [expiry, setExpiry] = React.useState<number | null>(null);

    const setTokenAndExpiry = (newToken: string, newExpiry: number) => {
        setToken(newToken);
        setExpiry(newExpiry);
    };

    return (
        <AccessTokenContext.Provider value={{ token, expiry, setTokenAndExpiry }}>
            {children}
        </AccessTokenContext.Provider>
    );
};
