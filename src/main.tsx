import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { FavoritesProvider } from "./components/Favorites";
import { DataProvider } from "./store/DataProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
);
