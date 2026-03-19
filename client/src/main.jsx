import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./roots/Rootlayout.jsx";
import Home from "./Pages/Home.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import Dashboard from "./Pages/dashboard/Dashboard.jsx";
import Profile from "./Pages/dashboard/Profile.jsx";
import Layout from "./Pages/dashboard/Layout.jsx";
import Logout from "./Pages/dashboard/Logout.jsx";
import Reports from "./Pages/dashboard/Reports.jsx";
import AddTransactions from "./Pages/dashboard/AddTransactions.jsx";
import Transactions from "./Pages/dashboard/Transactions.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Settings from "./Pages/dashboard/Settings.jsx";
import Pricing from "./Pages/Pricing.jsx";
import Feature from "./Pages/Feature.jsx";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import AuthModalProvider from "./Context/AuthModalContext.jsx";
import Budget from "./Pages/dashboard/Budget.jsx";
import Export from "./Pages/dashboard/Export.jsx";
import Security from "./Pages/Settings/Security.jsx";
import Notifications from "./Pages/Settings/Notifications.jsx";
import Appearances from "./Pages/Settings/Appearances.jsx";
import Billing from "./Pages/Settings/Billing.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,

    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
      { path: "forgetPassword", element: <ForgotPassword /> },
      { path: "resetpassword/:token", element: <ResetPassword /> },
      { path: "verifyemail/:token", element: <VerifyEmail /> },
      { path: "pricing", element: <Pricing /> },
      { path: "feature", element: <Feature /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "*", element: <ErrorPage /> },

      {
        path: "dashboard",
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "logout", element: <Logout /> },
          { path: "reports", element: <Reports /> },
          { path: "addtransactions", element: <AddTransactions /> },
          { path: "transactions", element: <Transactions /> },
          { path: "budget", element: <Budget /> },
          { path: "export", element: <Export /> },

          {
            path: "settings",
            element: <Settings />,
            children: [
              { index: true, element: <Profile /> },
              { path: "security", element: <Security /> },
              { path: "notifications", element: <Notifications /> },
              { path: "appearance", element: <Appearances /> },
              { path: "billing", element: <Billing /> },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AuthModalProvider>
        <RouterProvider router={router} />
      </AuthModalProvider>
    </AuthProvider>
  </StrictMode>,
);
