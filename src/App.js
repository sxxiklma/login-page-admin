import logo from "./logo.svg";
import "./App.css";
import Home from "./core/pages/Home";
import Header from "./core/components/Header";
import MenuItem from "./core/components/Sidebar/MenuItem";
import Sidebar from "./core/components/Sidebar/Sidebar";
import BaseLayout from "./core/layouts/BaseLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./core/pages/ErrorPage";
import Login from "./core/pages/Login";
import { Context, UserContext, BackboneContext } from "./Context";
import { useContext, useState } from "react";
import ManageContracts from "./core/fragments/contracts/ManageContracts";
import Auth from "./core/services/Auth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { createTheme, ThemeProvider } from "@mui/material";


const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [context, setContext] = useState([]);
  const [userContext, setUserContext] = useState(Auth.getSession());
  const [locale, setLocale] = useState("en")
  const theme = createTheme();
  // theme.palette.mode = "dark";
  theme.testNewProp = 'hello'

  // console.log("fresh load");

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={[userContext, setUserContext]}>
        <Context.Provider value={[context, setContext]}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </Context.Provider>
      </UserContext.Provider>
    </ThemeProvider>

    // <div className="h-screen  m-0 bg-amber-200">
    //   <Header></Header>
    //   <Content content={<Home/>} />
    // </div>
  );
}

export default App;
