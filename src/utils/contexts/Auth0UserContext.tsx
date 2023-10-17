// Auth0UserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface Auth0UserContextProps {
    token: string | null;
    expiry: number | null;
    setTokenAndExpiry: (token: string, expiry: number) => void;
}

const Auth0UserContext = createContext<Auth0UserContextProps | undefined>(undefined);

export const useAuth0UserContext = () => {
    const context = useContext(Auth0UserContext);
    if (!context) {
        throw new Error("useAccessTokenContext must be used within an AccessTokenProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const Auth0UserProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [expiry, setExpiry] = React.useState<number | null>(null);

    const setTokenAndExpiry = (newToken: string, newExpiry: number) => {
        setToken(newToken);
        setExpiry(newExpiry);
    };

    return (
        <Auth0UserContext.Provider value={{ token, expiry, setTokenAndExpiry }}>
            {children}
        </Auth0UserContext.Provider>
    );
};
