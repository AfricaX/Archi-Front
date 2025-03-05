import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Projects from "./pages/Projects";
import NavBar from "./components/UI/NavBar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/projects",
      element: <Projects />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        {" "}
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
