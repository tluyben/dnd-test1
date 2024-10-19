import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Palette from "./Palette";
import Canvas from "./Canvas";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Palette />
        <Canvas />
      </div>
    </DndProvider>
  );
}

export default App;
