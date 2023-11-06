import React from "react";
import logo from "../../assets/images/logov2.svg";
import { Menu } from "@mui/icons-material";
import { IconButton, Button, SvgIcon, Link } from "@mui/material";
import { styleConfig } from "../../config/StyleConfig";
import { useContext } from "react";
import { UserContext, BackboneContext } from "../../Context";
import Auth from "../services/Auth";

const Header = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  // const [backboneContext, setBackboneContext] = useContext(BackboneContext);

  return (
    <div
      // className={
      //   "flex fixed top-0 w-full h-12 bg-orange-600 " + props.className
      // }
      className={
        "flex fixed top-0 w-full h-12  " +
        "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400  transition-all duration-1000 z-50 " +
        props.className
      }
      style={{ height: styleConfig.headerHeight }}
    >
      <IconButton
        className=" justify-self-start text-gray-600 hover:text-gray-900"
        size="medium"
        onClick={props.onClickMenu}
      >
        <Menu className="ml-2" fontSize="inherit" />
      </IconButton>

      <img
        src={logo}
        className="h-8 mt-auto ml-12 mb-auto z-10 col-span-6 drop-shadow-lg"
      ></img>

      <span className="font-medium text-sm ml-auto mr-5 my-auto ">
        <Link
          href="#"
          variant="body2"
          sx={{ color: "black" }}
          onClick={() => { Auth.logout(); setUserContext({}); localStorage.clear() }}
        >
          Logout
        </Link>
      </span>
    </div>
  );
};

export default Header;
