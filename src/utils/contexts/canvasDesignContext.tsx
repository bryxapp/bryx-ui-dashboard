import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CanvasDesignData } from '../types/CanvasInterfaces';
import { createEmptyCanvasDesign } from '../types/ShapesFactory';

interface CanvasDesignContextProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: (newDesign: CanvasDesignData) => void;
    undoLastChange: () => void;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

const defaultContextValue: CanvasDesignContextProps = {
    canvasDesign: createEmptyCanvasDesign(8.5, 11), // Providing a default canvas design.
    selectedId: '',
    setCanvasDesign: () => {
        throw new Error('setCanvasDesign function cannot be used outside of CanvasDesignProvider');
    },
    undoLastChange: () => {
        throw new Error('undoLastChange function cannot be used outside of CanvasDesignProvider');
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
    const [history, setHistory] = useState<CanvasDesignData[]>([]);

    const handleSetCanvasDesign = (newDesign: CanvasDesignData) => {
        const pastCanvasDesign = JSON.stringify(canvasDesign);
        setHistory(prevHistory => [...prevHistory, JSON.parse(pastCanvasDesign)]);
        setCanvasDesign(newDesign);
    };

    const handleUndoLastChange = () => {
        if (history.length > 0) {
            const lastDesign = history.pop(); // Remove the last element from the history
            setCanvasDesign(lastDesign!); // Set the popped state as the current state
            setHistory([...history]); // Update the history state
        }
    };

    return (
        <CanvasDesignContext.Provider value={{ canvasDesign, setCanvasDesign: handleSetCanvasDesign, undoLastChange: handleUndoLastChange, selectedId, setSelectedId }}>
            {children}
        </CanvasDesignContext.Provider>
    );
};
