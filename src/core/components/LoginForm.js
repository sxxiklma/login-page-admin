import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Button,
  Link,
  Avatar,
  TextField,
  Checkbox,
  Alert,
} from "@mui/material";
import Copyright from "./Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext, BackboneContext } from "../../Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FingerprintOutlined } from "@mui/icons-material";
import { Cookie } from "universal-cookie";
import { Buffer } from "buffer";
import { encrypt, decrypt, Encrypter, decodeB64 } from "../util/Encrypter";
import Auth from "../services/Auth";
import jwt_decode from "jwt-decode";
import * as jose from 'jose';
// import cbnlogo from '../../assets/images/cbnlogo.svg';
import logo from '../../assets/images/logov2.svg';

// import verify from "jsonwebtoken/verify";

// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

// require("dotenv").config();
import cryptoJs from "crypto-js";

import axios from "axios";
import { Config } from "../../config/Config";
// import { Backbone } from "../util/Backbone";

const LoginForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const minPasswordLen = 1;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const regexp = new RegExp(
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
  );
  // const regexp = new RegExp("[^@]+@[^@]+.[^@]+");

  // const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const isValidEmail = (e) => {
    return regexp.test(e);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // let remember = data.getAll("remember"); // hobbies is checkbox's name
    // let obj = JSON.stringify(Object.fromEntries(data));
    let obj = Object.fromEntries(data);
    // let payload = {
    //   username: data.get("email"),
    //   password: data.get("password"),
    // };
    let credentials = Buffer.from(`${obj.email}:${obj.password}`).toString("Base64");
    let payload = {
      credentials: credentials,
    };

    // var [status, body] = await Auth.login(obj.email, obj.password);
    // localStorage.setItem('accessToken', 'add context details as required');
    setUserContext({ message: "add context details as required", email: "test@mail.com" })
    navigate("/");
    // Auth.login(obj.email, obj.password).then(res => {

    //   var [status, body] = res
    //   if (status === 200) {
    //     var session = jwt_decode(body.accessToken)
    //     setUserContext(session);
    //     console.log('login')

    //     //Fetch Data
    //     setError(false);
    //     setErrorMessage('');
    //     localStorage.setItem('accessToken', "add context details as required");
    //     setUserContext("add context details as required")
    //     navigate("/");
    //     // } else {
    //     //   setError(true);
    //     //   setErrorMessage('Login unsuccessful');
    //     // }

    //   }
    // }


    // ).catch(err => {
    //   console.log(err);
    //   setError(true);
    //   setErrorMessage('Login unsuccessful');
    //   navigate("/home");

    // });



  };

  return (
    <Grid item xs={11} sm={5} md={4} lg={4} component={Paper} elevation={6} square
      height={{ xs: '100%', sm: '70%' }} alignSelf={"center"}
      minHeight={600}
      minWidth={{ sm: '350px' }}
      maxWidth={{ sm: '500px' }}
    >


      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}

        marginY={{ xs: 3 }}
      >
        <img src={logo} className="h-[3rem] xs:block sm:hidden  xs:mb-8 drop-shadow-lg" />

        <span className="xs:hidden sm:block ">
          <Avatar sx={{ m: 1, bgcolor: "#94b0da" }}>
            <LockOutlinedIcon sx={{ color: "#FFFFFF" }} />
          </Avatar>
        </span>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="text"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e, val) => {
              setEmail(e.target.value);
            }}
            error={/*!isValidEmail(email) &&*/ email != null}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            noValidate={false}
            onChange={(e, val) => {
              setPassword(e.target.value);
            }}
          />
          {
            error &&
            (<Alert severity="error">{errorMessage}</Alert>)
          }
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" name="remember" />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            //TODO check password is not empty also
            disabled={
              /*!isValidEmail(email) &&*/ email == null ||
              password.length < minPasswordLen
            }
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid >
  );
};

export default LoginForm;
