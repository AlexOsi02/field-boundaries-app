import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { YMaps } from "@pbe/react-yandex-maps";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <YMaps>
      <App />
    </YMaps>
  </StrictMode>
);
