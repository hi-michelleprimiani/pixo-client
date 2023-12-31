import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <html>
      <body>
        <Theme appearance="light" accentColor="jade" radius="full">
          <App />
        </Theme>
      </body>
    </html>
  </React.StrictMode>,
);
