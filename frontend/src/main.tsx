import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store/store";
import { Register } from "./pages/RegisterPage";
import { Admin } from "./pages/AdminPage";
import { Forgot } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Products } from "./pages/Products";
import { AppleProducts } from "./pages/AppleProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot",
    element: <Forgot />,
  },
  {
    path: "reset",
    element: <ResetPassword />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "appleproducts",
    element: <AppleProducts />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
