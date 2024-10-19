import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CanvasItem from "./CanvasItem";
import { useCanvasItems } from "./useCanvasItems";

interface CanvasProps {
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedComponentId,
  setSelectedComponentId,
}) => {
  const { items, addItem } = useCanvasItems();

  const [, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const canvas = document.getElementById("canvas");
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const x = offset.x - canvasRect.left;
          const y = offset.y - canvasRect.top;
          handleAddItem(item.type, x, y);
        }
      }
    },
  });

  const handleAddItem = (type: string, x: number, y: number) => {
    const newItem = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      width: 120,
      height: 50,
      properties: getDefaultProperties(type),
    };
    addItem(newItem);
  };

  const getDefaultProperties = (type: string) => {
    switch (type) {
      case "button":
        return { text: "Button", color: "default" };
      case "input":
        return { value: "", placeholder: "Text Input" };
      case "label":
        return { text: "Label" };
      default:
        return {};
    }
  };

  return (
    <div
      id="canvas"
      ref={drop}
      className="flex-1 relative bg-gray-50 overflow-auto"
    >
      {items.map((item) => (
        <CanvasItem
          key={item.id}
          data={item}
          isSelected={selectedComponentId === item.id}
          onSelect={setSelectedComponentId}
        />
      ))}
    </div>
  );
};

export default Canvas;
