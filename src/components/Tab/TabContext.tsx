import { createContext, useContext } from "react";

interface ITabContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabContext = createContext<ITabContextValue | null>(null);

export function TabProvider({
  children,
  value,
  setValue,
}: React.PropsWithChildren<ITabContextValue>) {
  return (
    <TabContext.Provider value={{ value, setValue }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tab components must be used within Tab.Root.");
  }

  return context;
}
