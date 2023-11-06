import { blue } from "@mui/material/colors";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Work,
  Schedule,
  Dashboard,
  Settings,
  LineStyleSharp,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const MenuItem = ({ title, path, docked, className, icon }) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement="left"
      enterDelay={docked ? 5000 : 100}
    >
      <NavLink
        to={path}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <div
          className={
            "border-b border-opacity-30 border-solid opacity-100 " +
            "border-green-900 text-gray-900 font-semibold text-center rounded-lg " +
            "bg-gradient-to-r hover:from-blue-200 hover:via-blue-200 hover:to-blue-100 " +
            "hover:border-opacity-100 h-10 mx-5 space-x-8 mt-2 " +
            (docked ? "grid grid-cols-4 " : "") +
            className
          }
        >
          {/* <Settings /> */}
          {icon}
          <span className={(docked ? "" : "hidden") + " col-span-3 text-left"}>
            {title}
          </span>
        </div>
      </NavLink>
    </Tooltip>
  );
};

export default MenuItem;
