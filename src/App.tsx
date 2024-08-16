import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/navbar";
import Layout from "./component/layout";
import Home from "./pages/Home";
import StudentDetailsPage from "./pages/StudentDetails";
import Dashboard from "./component/dashboard/indext";
import StudentsMNGPage from "./pages/admin/studentsMNG";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "studentsMNG",
              element: <StudentsMNGPage />,
            },
          ],
        },
        {
          path: "/contact",
          element: <h1>Contact</h1>,
        },
        {
          path: "/details/:id",
          element: <StudentDetailsPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
