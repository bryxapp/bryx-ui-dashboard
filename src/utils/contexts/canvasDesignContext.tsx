// CanvasDesignContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CanvasDesignData } from '../types/CanvasInterfaces';
import { createEmptyCanvasDesign } from '../types/ShapesFactory';

interface CanvasDesignContextProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

const defaultContextValue: CanvasDesignContextProps = {
    canvasDesign: createEmptyCanvasDesign(8.5, 11), // Providing a default canvas design.
    selectedId: '',
    setCanvasDesign: () => {
        throw new Error('setCanvasDesign function cannot be used outside of CanvasDesignProvider');
    },
    setSelectedId: () => {
        throw new Error('setSelectedId function cannot be used outside of CanvasDesignProvider');
    },
};

const CanvasDesignContext = createContext<CanvasDesignContextProps>(defaultContextValue);

export const useCanvasDesignContext = () => {
    const context = useContext(CanvasDesignContext);
    if (!context) {
        throw new Error("useCanvasDesignContext must be used within an CanvasDesignProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const CanvasDesignProvider: React.FC<Props> = ({ children }) => {
    const [canvasDesign, setCanvasDesign] = useState<CanvasDesignData>(createEmptyCanvasDesign(8.5, 11));
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <CanvasDesignContext.Provider value={{ canvasDesign, setCanvasDesign, selectedId, setSelectedId }}>
            {children}
        </CanvasDesignContext.Provider>
    );
};

export const PassInCanvasDesignProvider = ({ children, canvasDesign, setCanvasDesign, selectedId, setSelectedId }:any) => {
    return (
        <CanvasDesignContext.Provider value={{ canvasDesign, setCanvasDesign, selectedId, setSelectedId }}>
            {children}
        </CanvasDesignContext.Provider>
    );
};
