import { ErrorBoundary } from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "*",
        Component: Layout,
        ErrorBoundary: ErrorBoundary,
        children: [
            { index: true, Component: HomePage },
        ],
    },
]);

export default router;