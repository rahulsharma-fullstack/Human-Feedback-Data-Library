import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchPage } from "./screens/SearchPage";
import { AboutPage } from "./screens/AboutPage";
import { LandingPage } from "./screens/LandingPage";
import { AiChatbotPage } from "./screens/AiChatbotPage";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <SearchPage />,
  },
  {
    path: "/search-page",
    element: <SearchPage />,
  },
  {
    path: "/about-page",
    element: <AboutPage />,
  },
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/ai-chatbot-page",
    element: <AiChatbotPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
