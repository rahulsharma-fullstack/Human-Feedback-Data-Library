import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchPage } from "./screens/SearchPage";
import { AboutPage } from "./screens/AboutPage";
import { LandingPage } from "./screens/LandingPage";
import { AiChatbotPage } from "./screens/AiChatbotPage";
import { UserGuidePage } from "./screens/UserGuidePage";
import GoogleFormPage from './screens/GoogleFormPage';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <LandingPage />,
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
  {
    path: "/userguide-page",
    element: <UserGuidePage/>,
  },
  {
    path: "/google-form",
    element: <GoogleFormPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
