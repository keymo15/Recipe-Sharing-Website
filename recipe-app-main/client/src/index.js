import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
