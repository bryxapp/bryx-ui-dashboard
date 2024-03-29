import { useEffect } from "react";
import { findShape, deleteShape, moveShape, pasteObject, toggleTextStyle } from "../../../utils/shapeManagementUtils";

export const useCanvasKeyboardShortcuts = ({
  canvasDesign,
  setCanvasDesign,
  selectedId,
  setSelectedId,
  copiedObject,
  setCopiedObject,
}: any) => {

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case "Delete":
          deleteShape({ canvasDesign, setCanvasDesign });
          break;
        case "Escape":
          setSelectedId(null)
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
        case "c":
          if (event.ctrlKey || event.metaKey) {
            setCopiedObject(findShape(canvasDesign,selectedId) || null);
          }
          break;
        case "v":
          if (event.ctrlKey || event.metaKey) {
            if (copiedObject) {
              pasteObject(canvasDesign, setCanvasDesign, selectedId, copiedObject); // Adjust the paste position as needed
            }
          }
          break;
        case "b":
          if (event.ctrlKey || event.metaKey) {
            toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, "bold");
          }
          break;
        case "i":
          if (event.ctrlKey || event.metaKey) {
            toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, "italic");
          }
          break;
        case "u":
          if (event.ctrlKey || event.metaKey) {
            toggleTextStyle(canvasDesign, setCanvasDesign, selectedId, "underline");
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasDesign, setCanvasDesign, setSelectedId, copiedObject, setCopiedObject, selectedId]);
};
