import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("content") as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
