import { Rect } from "react-konva";
import { changeCursor } from "../../TextTableUtils";


interface TextTableProps {
    handleSelect: any;
    shapeRef: any
}

const TableGrabber: React.FC<TextTableProps> = ({
    handleSelect,
    shapeRef
}) => {


    return (
        <Rect
            x={-10}
            y={-10}
            width={8}
            height={8}
            fill='#00a2ff'
            onClick={(e) => {
                e.cancelBubble = true; // Prevent group click action
                handleSelect();
            }}
            onMouseEnter={() => changeCursor('move', shapeRef)}
            onMouseLeave={() => changeCursor('default', shapeRef)}
        />
    );
};

export default TableGrabber;
