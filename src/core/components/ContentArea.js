import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

const ContentArea = (props) => {
  return (
    <div className={" " + props.className}>
      <div className="relative mx-10 pb-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default ContentArea;
