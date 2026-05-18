import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import LoaderProvider from "./context/LoaderContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>,
);
