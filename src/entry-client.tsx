/**
 * Client-side entry point for hydration
 * This file is used to hydrate the pre-rendered HTML on the client
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Use hydrateRoot for SSR/pre-rendered content
ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
