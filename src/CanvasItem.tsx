import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { X } from "lucide-react";
import { useCanvasItems } from "./useCanvasItems";

interface CanvasItemProps {
  data: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CanvasItem: React.FC<CanvasItemProps> = ({
  data,
  isSelected,
  onSelect,
}) => {
  const { id, type, x, y, width, height, properties, events } = data;
  const { updateItem, deleteItem } = useCanvasItems();
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    // Update position and size in the shared state
    updateItem(id, {
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, size]);

  useEffect(() => {
    // Update properties if changed from properties pane
    setPosition({ x: data.x, y: data.y });
    setSize({ width: data.width, height: data.height });
  }, [data.x, data.y, data.width, data.height]);

  // Function to execute event code
  const executeEvent = (eventName: string) => {
    if (events && events[eventName]) {
      try {
        // eslint-disable-next-line no-eval
        eval(events[eventName]);
      } catch (error) {
        console.error(
          `Error executing ${eventName} for component ${id}:`,
          error
        );
      }
    }
  };

  const renderComponent = () => {
    switch (type) {
      case "button":
        return (
          <Button
            className="w-full h-full"
            variant={properties.color}
            onClick={() => executeEvent("onClick")}
          >
            {properties.text}
          </Button>
        );
      case "input":
        return (
          <Input
            placeholder={properties.placeholder}
            value={properties.value}
            className="w-full h-full"
            readOnly
            onFocus={() => executeEvent("onFocus")}
            onChange={() => executeEvent("onChange")}
          />
        );
      case "label":
        return (
          <Label
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => executeEvent("onClick")}
          >
            {properties.text}
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
      className={`absolute border ${
        isSelected ? "border-blue-500" : "border-gray-300"
      } bg-white shadow-md`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onSelect(id);
      }}
    >
      <div className="relative w-full h-full">
        {renderComponent()}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(id);
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
          <X size={12} />
        </button>
      </div>
    </Rnd>
  );
};

export default CanvasItem;
