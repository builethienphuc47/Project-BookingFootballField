import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import HomePage from "../homepage";

export default function AppDefaut() {
  return (
    <>
      <div className="header-navbar">
        <Navbar />
      </div>
      <div className="wrapper">
        <HomePage />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
