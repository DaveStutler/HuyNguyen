import React from "react";
import Navbar from '../components/navbar/navbar';
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