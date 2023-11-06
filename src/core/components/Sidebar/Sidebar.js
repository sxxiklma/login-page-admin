import React from "react";
import MenuItem from "./MenuItem";
import { styleConfig } from "../../../config/StyleConfig";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { create } from "@mui/material/styles/createTransitions";
import { UserContext } from "../../../Context";
import { useContext } from "react";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import {
  Person2Outlined,
  Person,
  Person2,
  Person2TwoTone,
} from "@mui/icons-material";
import logo from "../../../assets/images/logov2.svg";
import UserProfileDisplay from "./UserProfileDisplay";
import { Home, Work, Schedule, Dashboard, Settings } from "@mui/icons-material";

// const ht = "100vh - " + styleConfig.headerHeight;
const navItems = [
  { title: "Home", path: "/home", icon: <Home /> },
  {
    title: "Menu Item1",
    path: "/menu1",
    icon: <Work />,
    subnav: [
      { title: "Submenu1", path: "/" },
      { title: "Submenu2", path: "/" },
    ],
  },
  { title: "Menu Item2", path: "/reports", icon: <Dashboard /> },
  { title: "Menu Item3", path: "/", icon: <Settings /> },
];

const Sidebar = ({ docked }) => {
  const [userContext] = useContext(UserContext);

  // const action=(){}
  //   console.log(docked);
  return (
    <div
      className={
        "fixed top-12 mt-0 mb-0 h-[calc(100%-3rem)] shadow-slate-900 shadow-lg " +
        " bg-gray-100 " +
        (docked ? "w-[20rem]" : "w-[5rem]")
      }
    // className={" " + props.className}
    //  style={{minHeight:`calc(${ht})`}}
    >
      {/* {console.log(props)} */}
      {/* <Link  to={"/home"}>Home</Link> */}
      <div
        className={
          "flex flex-col justify-items-center text-gray-900 content-center items-center " +
          "bg-gradient-to-r  " +
          " mx-5 space-y-5 mt-4 pt-2 "
        }
      >
        {/* <img src={logo} className="h-[7rem] drop-shadow-lg"></img> */}
      </div>
      <div className="my-10">
        <UserProfileDisplay docked={docked} />
      </div>

      {navItems.map((nav, index) => {
        // console.log(nav.subnav);
        if (!nav.subnav)
          return (
            <MenuItem
              key={index}
              title={nav.title}
              path={nav.path}
              docked={docked}
              icon={nav.icon}
            />
          );
        else if (nav.subnav.length < 1)
          return (
            <MenuItem
              key={index}
              title={nav.title}
              path={nav.path}
              docked={docked}
              icon={nav.icon}
            />
          );
        return (
          <Menu
            key={index}
            title={nav.title}
            path={nav.path}
            subnav={nav.subnav}
            docked={docked}
            icon={nav.icon}
          />
        );
      })}

      {/* <MenuItem title="home" path="/home">
        <div>hiii</div>
      </MenuItem> */}
      {/* {props.children} */}
      {/* hii */}
    </div>
  );
};

export default Sidebar;
