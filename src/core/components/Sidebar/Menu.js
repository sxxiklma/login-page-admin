import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import {
  Home,
  Work,
  Schedule,
  Dashboard,
  Settings,
  ArrowDownwardRounded,
  ArrowDropDown,
  ArrowDropUp,
  Circle,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const Menu = ({ title, path, subnav, docked, icon }) => {
  const [show, setShow] = useState(false);

  const menuItems = subnav.map((sn, index) => {
    return (
      <Tooltip
        title={sn.title}
        arrow
        placement="left"
        enterDelay={docked ? 5000 : 100}
        key={index}
      >
        <div className="border-green-900 text-gray-900 text-sm text-left  ml-4">
          <MenuItem
            title={sn.title}
            path={sn.path}
            docked={docked}
            className="bg-gray-300 font-normal"
            icon={sn.icon ? sn.icon : <Circle sx={{ width: "0.5rem" }} />}
          />
        </div>
      </Tooltip>
    );
  });

  return (
    <>
      <Tooltip
        title={title}
        arrow
        placement="left"
        enterDelay={docked ? 5000 : 100}
      >
        <div
          className={`border-b border-opacity-30 border-solid opacity-100
       border-green-900 text-gray-900 font-semibold text-center rounded-lg
       hover:bg-gradient-to-r hover:from-blue-200 hover:via-blue-200 hover:to-blue-100 
       hover:border-opacity-100 h-10 mx-5 space-x-8 mt-2 ${docked ? "grid grid-cols-4 grid-flow-col" : ""
            } `}
          // onMouseEnter={() => setShow(true)}
          // onMouseLeave={() => setShow(false)}
          onClick={() => setShow((prev) => !prev)}
        >
          {/* <Settings /> */}
          {icon}{" "}
          <span className={(docked ? "" : "hidden") + " col-span-2 text-left"}>
            {title}
          </span>
          {show ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
      </Tooltip>

      {show && menuItems}
    </>
  );
};

export default Menu;
