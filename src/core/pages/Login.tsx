import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { createTheme, useTheme } from "@mui/material";
import logo from "../../assets/images/logov2.svg";
import React from "react";

// const theme = createTheme();
localStorage.clear();

const Login = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    // <ThemeProvider theme={theme}>
    <Grid
      container
      component="main"
      sx={{ height: "100vh", transitionDuration: "5000ms" }}
      // className="bg-gradient-to-r from-slate-200 to-blue-200  transition-all duration-1000"
      className="bg-gradient-to-r from-slate-200 via-orange-700 to-blue-600  transition-all duration-1000"
    >
      <CssBaseline />
      <Grid
        item
        xs={1}
        sm={5}
        md={6}
        lg={6}
        sx={
          {
            // backgroundColor
            // backgroundImage: "url(https://source.unsplash.com/random)",
            // backgroundRepeat: "no-repeat",
            // backgroundColor: (t) =>
            //   t.palette.mode === "light"
            //     ? t.palette.grey[50]
            //     : t.palette.grey[900],
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // transitionDuration: '150ms',
            // transitionProperty: 'all'
          }
        }
      >
        <div className=" h-full w-full flex justify-center place-items-center">
          <img
            src={logo}
            className=" drop-shadow-black  h-[5rem] xs:hidden sm:block"
          ></img>
        </div>
      </Grid>

      <LoginForm />
    </Grid>
    // </ThemeProvider>
  );
};

export default Login;
