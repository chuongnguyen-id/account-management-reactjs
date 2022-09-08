import { Layout } from "antd";
import React from "react";
import Home from "./home";
import Content from "./content";
import Footer from "./footer";
import SubFooter from "./footer/SubFooter";

const Layouts = () => (
  <Layout>
    <Home />
    <Content />
    <Footer />
    <SubFooter />
  </Layout>
);

export default Layouts;
