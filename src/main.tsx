import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * StrictMode is enabled to help find bugs!
 *
 * StrictMode does the following in development:
 * 1. Double-invokes components, effects, and reducers
 * 2. Detects unexpected side effects
 *
 * TASK: Try removing StrictMode and see how behavior changes
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
