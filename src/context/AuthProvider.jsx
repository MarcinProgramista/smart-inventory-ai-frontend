import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // pobieranie danych z localStorage i ustawienie ich jako początkowy stan auth
  const [auth, setAuth] = useState(() => {
    const sorted = localStorage.getItem("auth");
    return sorted ? JSON.parse(sorted) : null;
  });
  //--- automatycznie zapisywanie danych auth przy kadej zmianie auth
  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
