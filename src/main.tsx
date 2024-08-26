import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PresupuestoProvider } from "./context/PresupuestoContext.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PresupuestoProvider>
      <App />
      <ToastContainer/>
    </PresupuestoProvider>
  </StrictMode>
);
