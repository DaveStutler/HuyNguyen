import React from "react";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Outlet } from "react-router-dom";
import ScrollToTop from '../components/ScrollToTop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};


export default Layout;