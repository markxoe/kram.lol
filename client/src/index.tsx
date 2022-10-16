/// <reference types="vite/client" />
import { createRoot } from "react-dom/client";
import App from "./App";

import "inter-ui";
import "reset-css";
import "./index.css";

createRoot(document.getElementById("app")).render(<App />);
