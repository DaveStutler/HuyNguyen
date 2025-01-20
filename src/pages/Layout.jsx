import React from "react";
import Navbar from "../Components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};


export default Layout;