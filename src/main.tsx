import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import Info from "./pages/info";
import Settings from "./pages/settings";
import Timer from "./pages/timer";
import "./main.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
    throw new Error("Failed to find the root element");
}

createRoot(rootEl).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<Timer />} path="/" />
                    <Route element={<Settings />} path="/settings" />
                    <Route element={<Info />} path="/info" />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
