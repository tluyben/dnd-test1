import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

const components = [
  { type: "button", label: "Button" },
  { type: "input", label: "Text Input" },
  { type: "label", label: "Label" },
];

interface PaletteItemProps {
  componentData: { type: string; label: string };
}

const PaletteItem: React.FC<PaletteItemProps> = ({ componentData }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { type: componentData.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white border rounded-md cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {componentData.label}
    </div>
  );
};

const Palette: React.FC = () => {
  return (
    <div className="w-64 p-4 bg-gray-100 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Palette</h3>
      {components.map((componentData) => (
        <PaletteItem key={componentData.type} componentData={componentData} />
      ))}
    </div>
  );
};

export default Palette;
