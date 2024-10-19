import { useContext, createContext, useState } from "react";

const CanvasItemsContext = createContext<any>(null);

export const useCanvasItems = () => {
  return useContext(CanvasItemsContext);
};

export const CanvasItemsProvider = ({ children }: any) => {
  const [items, setItems] = useState<any[]>([]);

  const addItem = (item: any) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const updateItem = (id: string, updates: any) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              properties: {
                ...item.properties,
                ...(updates.properties || {}),
              },
            }
          : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CanvasItemsContext.Provider
      value={{ items, addItem, updateItem, deleteItem }}
    >
      {children}
    </CanvasItemsContext.Provider>
  );
};
