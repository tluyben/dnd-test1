import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";

const componentGroups = [
  {
    title: "Basic Controls",
    components: [
      { type: "button", label: "Button" },
      { type: "input", label: "Text Input" },
      { type: "label", label: "Label" },
    ],
  },
  {
    title: "Containers",
    components: [
      { type: "button", label: "Button" },
      { type: "input", label: "Text Input" },
      { type: "label", label: "Label" },
    ],
  },
  {
    title: "Advanced Controls",
    components: [
      { type: "button", label: "Button" },
      { type: "input", label: "Text Input" },
      { type: "label", label: "Label" },
    ],
  },
  {
    title: "Form Elements",
    components: [
      { type: "button", label: "Button" },
      { type: "input", label: "Text Input" },
      { type: "label", label: "Label" },
    ],
  },
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
      <Accordion
        type="multiple"
        defaultValue={componentGroups.map((group) => group.title)}
      >
        {componentGroups.map((group) => (
          <AccordionItem key={group.title} value={group.title}>
            <AccordionTrigger>{group.title}</AccordionTrigger>
            <AccordionContent>
              {group.components.map((componentData) => (
                <PaletteItem
                  key={componentData.type + componentData.label + group.title}
                  componentData={componentData}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Palette;
