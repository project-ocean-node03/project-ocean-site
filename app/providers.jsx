"use client";
import { createContext, useContext, useEffect, useState } from "react";

const VeilContext = createContext({ veil:false, setVeil: () => {} });

export function Providers({ children }) {
  const [veil, setVeil] = useState(false);

  // reflect veil state on <html> for global CSS control
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("veil", veil);
  }, [veil]);

  return (
    <VeilContext.Provider value={{ veil, setVeil }}>
      {children}
    </VeilContext.Provider>
  );
}

export function useVeil() {
  return useContext(VeilContext);
}
