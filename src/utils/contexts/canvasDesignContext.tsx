import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CanvasDesignData } from '../types/CanvasInterfaces';
import { createEmptyCanvasDesign } from '../types/ShapesFactory';

interface CanvasDesignContextProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: (newDesign: CanvasDesignData) => void;
    undoLastChange: () => void;
    redoLastChange: () => void;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

const defaultContextValue: CanvasDesignContextProps = {
    canvasDesign: createEmptyCanvasDesign(8.5, 11),
    selectedId: '',
    setCanvasDesign: () => {
        throw new Error('setCanvasDesign function cannot be used outside of CanvasDesignProvider');
    },
    undoLastChange: () => {
        throw new Error('undoLastChange function cannot be used outside of CanvasDesignProvider');
    },
    redoLastChange: () => {
        throw new Error('redoLastChange function cannot be used outside of CanvasDesignProvider');
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
    const [historyStep, setHistoryStep] = useState<number>(0);

    const handleSetCanvasDesign = (newDesign: CanvasDesignData) => {
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(newDesign);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
        setCanvasDesign(newDesign);
    };

    const handleUndoLastChange = () => {
        if (historyStep > 0) {
            const newStep = historyStep - 1;
            setCanvasDesign(history[newStep]);
            setHistoryStep(newStep);
        }
    };

    const handleRedoLastChange = () => {
        if (historyStep < history.length - 1) {
            const newStep = historyStep + 1;
            setCanvasDesign(history[newStep]);
            setHistoryStep(newStep);
        }
    };

    return (
        <CanvasDesignContext.Provider value={{
            canvasDesign,
            setCanvasDesign: handleSetCanvasDesign,
            undoLastChange: handleUndoLastChange,
            redoLastChange: handleRedoLastChange,
            selectedId,
            setSelectedId
        }}>
            {children}
        </CanvasDesignContext.Provider>
    );
};