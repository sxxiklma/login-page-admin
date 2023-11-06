import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, redirect, Navigate } from "react-router-dom";
import ContentArea from "../components/ContentArea";
import { useContext } from "react";
import { Context, UserContext } from "../../Context";
import { styleConfig } from "../../config/StyleConfig";

const BaseLayout = () => {
  let [context, setContext] = useContext(Context);
  let [userContext, setUserContext] = useContext(UserContext);
  const [showNav, setShowNav] = useState(true);

  const divStyle = {
    height: 'calc(100% - 276px)',
    fallbacks: [
      { height: '-moz-calc(100% - 276px)' },
      { height: '-webkit-calc(100% - 276px)' },
      { height: '-o-calc(100% - 276px)' }
    ]
  }
  // console.log(context);
  console.log(userContext);

  if (!userContext) {
    return <Navigate to="/login" />;
  } else {
    if (!userContext.email) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div >
      <Header onClickMenu={() => setShowNav((prev) => !prev)} />


      {/* {showNav && <Sidebar {showNav && docked}/>} */}
      <Sidebar docked={showNav} />

      {/* <div className='flex-grow  ml-[20rem]'>
                <Outlet/>
            </div> */}
      {/* <div className="flex relative mt-12"> */}
      <div className={"fixed top-12 h-[calc(100%-3rem)] mb-12  overflow-auto  "
        + (showNav ? "ml-[20rem] w-[calc(100%-20rem)] " : "ml-[5rem] w-[calc(100%-5rem)] ")}
      >
        <ContentArea
          className={
            "  pt-10 h-5/6 " //+
            // (showNav ? "ml-[20rem]" : "ml-[5rem]")
          }
        />
      </div>
    </div>
  );
};

export default BaseLayout;
