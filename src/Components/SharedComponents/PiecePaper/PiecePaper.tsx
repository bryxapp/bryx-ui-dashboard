
interface PiecePaperProps {
    pageWidth: string | number;
    pageHeight: string | number;
    refProp?: React.RefObject<HTMLDivElement>;
    id?: string;
    children: React.ReactNode;
}

const PiecePaper: React.FC<PiecePaperProps> = ({ pageWidth, pageHeight, refProp, id, children }) => {
    
    const style = {
        width: pageWidth,
        height: pageHeight,
        boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
        borderRadius: '0.25in',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: 'white',
    };

    return <div id={id ? id : "id"} style={style} ref={refProp}>{children}</div>;
};

export default PiecePaper;
