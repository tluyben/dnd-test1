import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useCanvasItems } from "./useCanvasItems";
import Tabs from "./components/ui/tabs";

interface PropertiesPaneProps {
  selectedComponentId: string | null;
}

const PropertiesPane: React.FC<PropertiesPaneProps> = ({
  selectedComponentId,
}) => {
  const { items, updateItem } = useCanvasItems();
  const [activeTab, setActiveTab] = useState("Settings");

  const selectedItem = items.find((item) => item.id === selectedComponentId);

  if (!selectedItem) {
    return (
      <div className="w-64 p-4 bg-gray-100 overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        <p>Select a component to view its properties.</p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (activeTab === "Settings") {
      if (["x", "y", "width", "height"].includes(name)) {
        updateItem(selectedItem.id, {
          [name]: parseInt(value, 10),
        });
      } else {
        updateItem(selectedItem.id, {
          properties: {
            ...selectedItem.properties,
            [name]: value,
          },
        });
      }
    } else if (activeTab === "Events") {
      updateItem(selectedItem.id, {
        events: {
          ...selectedItem.events,
          [name]: value,
        },
      });
    }
  };

  // Render content based on the active tab
  const renderContent = () => {
    if (activeTab === "Settings") {
      return (
        <div className="space-y-4 mt-4">
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
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="y">Y Position</Label>
            <Input
              id="y"
              name="y"
              type="number"
              value={selectedItem.y}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              name="width"
              type="number"
              value={selectedItem.width}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={selectedItem.height}
              onChange={handleChange}
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
      );
    } else if (activeTab === "Events") {
      // Render event handlers based on component type
      const eventHandlers = getEventHandlersForType(selectedItem.type);

      if (eventHandlers.length === 0) {
        return <p className="mt-4">No events available for this component.</p>;
      }

      return (
        <div className="space-y-4 mt-4">
          {eventHandlers.map((event) => (
            <div key={event}>
              <Label htmlFor={event}>{event}</Label>
              <textarea
                id={event}
                name={event}
                value={selectedItem.events?.[event] || ""}
                onChange={handleChange}
                className="w-full h-20 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      );
    }
  };

  const getEventHandlersForType = (type: string): string[] => {
    switch (type) {
      case "button":
        return ["onClick"];
      case "label":
        return ["onClick"];
      case "input":
        return ["onFocus", "onChange"];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-100 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      {/* Tabs */}
      <Tabs
        tabs={["Settings", "Events"]}
        activeTab={activeTab}
        onTabClick={(tab) => setActiveTab(tab)}
      />
      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default PropertiesPane;
