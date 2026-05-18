/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import NeonLoader from "../components/ui/NeonLoader";

export const LoderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <NeonLoader />}
    </LoderContext.Provider>
  );
}
