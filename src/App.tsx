import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Palette from "./Palette";
import Canvas from "./Canvas";
import PropertiesPane from "./PropertiesPane";
import { CanvasItemsProvider } from "./useCanvasItems";

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );

  return (
    <CanvasItemsProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen">
          <Palette />
          <Canvas
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
          />
          <PropertiesPane selectedComponentId={selectedComponentId} />
        </div>
      </DndProvider>
    </CanvasItemsProvider>
  );
}

export default App;
