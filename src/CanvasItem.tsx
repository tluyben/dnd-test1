import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { X } from "lucide-react";

interface CanvasItemProps {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDelete: (id: string) => void;
}

const CanvasItem: React.FC<CanvasItemProps> = ({
  id,
  type,
  x,
  y,
  width,
  height,
  onDelete,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });

  const renderComponent = () => {
    switch (type) {
      case "button":
        return <Button className="w-full h-full">Button</Button>;
      case "input":
        return <Input placeholder="Text Input" className="w-full h-full" />;
      case "label":
        return (
          <Label className="w-full h-full flex items-center justify-center">
            Label
          </Label>
        );
      default:
        return null;
    }
  };

  return (
    <Rnd
      bounds="parent"
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
        setPosition(position);
      }}
      className="absolute border border-gray-300 bg-white shadow-md"
    >
      <div className="relative w-full h-full">
        {renderComponent()}
        <button
          onClick={() => onDelete(id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
          <X size={12} />
        </button>
      </div>
    </Rnd>
  );
};

export default CanvasItem;
