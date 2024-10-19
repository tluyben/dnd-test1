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
      const clientOffset = monitor.getClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();

      if (clientOffset && initialClientOffset && initialSourceClientOffset) {
        const canvas = document.getElementById("canvas");
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();

          // Calculate the offset within the component where the drag started
          const offsetX = initialClientOffset.x - initialSourceClientOffset.x;
          const offsetY = initialClientOffset.y - initialSourceClientOffset.y;

          // Adjust the drop position by subtracting the initial offset
          const x = clientOffset.x - canvasRect.left - offsetX;
          const y = clientOffset.y - canvasRect.top - offsetY;

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
