import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="background-filter">
      <img
        src="https://softcom.ng/uploads/headers/banner.jpg"
        srcSet="https://softcom.ng/uploads/headers/banner.jpg 576w, https://softcom.ng/uploads/headers/banner.jpg 768w, https://softcom.ng/uploads/headers/banner.jpg 960w, https://softcom.ng/uploads/headers/banner.jpg 1440w"
        alt="Softcom product"
        className="main-header-background"
      ></img>
      <h1 className="main-header">Welcome to Softcom!</h1>
    </section>
  );
}

export default Dashboard;
