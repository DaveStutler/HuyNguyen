import React from "react";
import Header from "../components/header/Header";
import Body from "../components/body/Body";
import Service from "../components/service/Service";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
        <Header />
        <Body />
        <Service />
        <Footer />
    </div>
  );
}

export default Home;