import { useEffect } from "react";
import { findShape, deleteShape, moveShape, pasteObject, toggleTextStyle } from "../../../utils/shapeManagementUtils";
import { CanvasDesignData } from "../../../utils/types/CanvasInterfaces";

interface CanvasKeyboardShortcutsProps {
  canvasDesign: CanvasDesignData;
  setCanvasDesign: any;
  selectedId: string | null;
  setSelectedId: any;
  copiedObject: any;
  setCopiedObject: any;
  undoLastChange: any;
  redoLastChange: any;
}

export const useCanvasKeyboardShortcuts = ({
  canvasDesign,
  setCanvasDesign,
  selectedId,
  setSelectedId,
  copiedObject,
  setCopiedObject,
  undoLastChange,
  redoLastChange,
}: CanvasKeyboardShortcutsProps) => {

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.target.tagName === "TEXTAREA") return;
      switch (event.key) {
        case "Delete":
          deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
          break;
        case "Escape":
          setSelectedId(null)
          break;
        case "ArrowUp":
          event.preventDefault();
          moveShape(canvasDesign, setCanvasDesign, "up", selectedId);
          break;
        case "ArrowDown":
          event.preventDefault();
          moveShape(canvasDesign, setCanvasDesign, "down", selectedId);
          break;
        case "ArrowLeft":
          event.preventDefault();
          moveShape(canvasDesign, setCanvasDesign, "left", selectedId);
          break;
        case "ArrowRight":
          event.preventDefault();
          moveShape(canvasDesign, setCanvasDesign, "right", selectedId);
          break;
        case "c":
          if (event.ctrlKey || event.metaKey) {
            setCopiedObject(findShape(canvasDesign, selectedId) || null);
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
        case "s":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            //TODO Save the canvas design
          }
          break;
        case "z":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (event.shiftKey) {
              redoLastChange();
            } else {
              undoLastChange();
            }
          }
          break;
        case "y":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            redoLastChange();
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
  }, [canvasDesign, setCanvasDesign, setSelectedId, copiedObject, setCopiedObject, selectedId, undoLastChange, redoLastChange]);
};
