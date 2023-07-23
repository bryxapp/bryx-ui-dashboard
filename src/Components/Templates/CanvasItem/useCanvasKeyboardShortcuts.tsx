import { useEffect } from "react";
import { deleteShape, moveShape, selectShape } from '../../../utils/functions/CanvasFunctions';

export const useCanvasKeyboardShortcuts = ({
  canvasDesign,
  setCanvasDesign,
  setSelectedId,
}: any) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case "Delete":
          deleteShape({ canvasDesign, setCanvasDesign });
          break;
        case "Escape":
          selectShape(null, setSelectedId, canvasDesign, setCanvasDesign);
          break;
        case "ArrowUp":
          moveShape({ canvasDesign, setCanvasDesign, direction: "up" });
          break;
        case "ArrowDown":
          moveShape({ canvasDesign, setCanvasDesign, direction: "down" });
          break;
        case "ArrowLeft":
          moveShape({ canvasDesign, setCanvasDesign, direction: "left" });
          break;
        case "ArrowRight":
          moveShape({ canvasDesign, setCanvasDesign, direction: "right" });
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasDesign, setCanvasDesign, setSelectedId]);
};