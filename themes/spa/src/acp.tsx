import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ACPBox from "./Dashboard";

createRoot(document.getElementById("content") as Element).render(
  <StrictMode>
    <ACPBox />
  </StrictMode>,
);
