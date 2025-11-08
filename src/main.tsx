import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import Info from "./pages/info";
import Settings from "./pages/settings";
import Stopwatch from "./pages/stopwatch";
import "./main.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
    throw new Error("Failed to find the root element");
}

createRoot(rootEl).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<Stopwatch />} path="/" />
                    <Route element={<Settings />} path="/settings" />
                    <Route element={<Info />} path="/info" />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
