import { Image } from "react-konva";
import { ImageObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewImageProps {
    ImageObj: ImageObj;
}

const PreviewImage = ({ ImageObj }: PreviewImageProps) => {
    const imageSrc = new window.Image();
    imageSrc.src = ImageObj.src;
    return (
        <Image
            key={ImageObj.id}
            id={ImageObj.id}
            x={ImageObj.x}
            y={ImageObj.y}
            image={imageSrc}
            width={ImageObj.width}
            height={ImageObj.height}
            rotation={ImageObj.rotation}
        />
    );
};

export default PreviewImage;
