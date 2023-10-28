import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MessagesGranja from "./routes/chat-granja";
//import {Comandos} from "./routes/comandos";




let router = createBrowserRouter([
  {
    path: "/chat-granja",
    element: <MessagesGranja />,
  },
  

]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} />;
}