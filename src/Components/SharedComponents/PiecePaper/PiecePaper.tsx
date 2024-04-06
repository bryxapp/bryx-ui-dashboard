import React from 'react';

interface PiecePaperProps {
    pageWidth: string | number;
    pageHeight: string | number;
    id?: string;
    children: React.ReactNode;
}

const PiecePaper: React.FC<PiecePaperProps> = ({ pageWidth, pageHeight, id, children }) => {
    const style = {
        width: pageWidth,
        height: pageHeight,
        boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
        borderRadius: '0.25in',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: 'white',
    };

    return <div id= {id? id: "id"} style={style}>{children}</div>;
};

export default PiecePaper;
