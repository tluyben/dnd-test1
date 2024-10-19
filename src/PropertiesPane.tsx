import React from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { useCanvasItems } from "./useCanvasItems";

interface PropertiesPaneProps {
  selectedComponentId: string | null;
}

const PropertiesPane: React.FC<PropertiesPaneProps> = ({
  selectedComponentId,
}) => {
  const { items, updateItem } = useCanvasItems();

  const selectedItem = items.find((item) => item.id === selectedComponentId);

  if (!selectedItem) {
    return (
      <div className="w-64 p-4 bg-gray-100 overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        <p>Select a component to view its properties.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateItem(selectedItem.id, {
      properties: {
        ...selectedItem.properties,
        [name]: value,
      },
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateItem(selectedItem.id, {
      [name]: parseInt(value, 10),
    });
  };

  return (
    <div className="w-64 p-4 bg-gray-100 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      <div className="space-y-4">
        {/* Common Properties */}
        <div>
          <Label htmlFor="id">ID</Label>
          <Input id="id" name="id" value={selectedItem.id} readOnly />
        </div>
        <div>
          <Label htmlFor="x">X Position</Label>
          <Input
            id="x"
            name="x"
            type="number"
            value={selectedItem.x}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <Label htmlFor="y">Y Position</Label>
          <Input
            id="y"
            name="y"
            type="number"
            value={selectedItem.y}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            name="width"
            type="number"
            value={selectedItem.width}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={selectedItem.height}
            onChange={handleNumberChange}
          />
        </div>

        {/* Component-Specific Properties */}
        {selectedItem.type === "label" && (
          <div>
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              name="text"
              value={selectedItem.properties.text}
              onChange={handleChange}
            />
          </div>
        )}
        {selectedItem.type === "input" && (
          <>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                value={selectedItem.properties.value}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                name="placeholder"
                value={selectedItem.properties.placeholder}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {selectedItem.type === "button" && (
          <>
            <div>
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                name="text"
                value={selectedItem.properties.text}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                name="color"
                value={selectedItem.properties.color}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPane;
