import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CanvasItem from "./CanvasItem";

interface CanvasItemData {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const Canvas: React.FC = () => {
  const [items, setItems] = useState<CanvasItemData[]>([]);

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
          addItem(item.type, x, y);
        }
      }
    },
  });

  const addItem = (type: string, x: number, y: number) => {
    const newItem: CanvasItemData = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      width: 120,
      height: 50,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div
      id="canvas"
      ref={drop}
      className="flex-1 relative bg-gray-50 overflow-auto"
    >
      {items.map((item) => (
        <CanvasItem key={item.id} {...item} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Canvas;
