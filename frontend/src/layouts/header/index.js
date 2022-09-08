import React from "react";
import { Space } from "antd";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import useScrollHook from "./scrollHook";
import Layouts from "..";
import Content from "../content";
import SignIn from "../authentication/sign-in";
import ListManager from "../table";
import { HeaderText, Logo } from "../../styles";
import Storage from "../../Storage/Storage";

const HeaderBar = () => {
  const style = useScrollHook();

  return (
    <BrowserRouter>
      <Space style={style}>
        <Link to="/">
          <HeaderText>Home</HeaderText>
        </Link>
        <Link to="/Category">
          <HeaderText>Category</HeaderText>
        </Link>
        <Link to="/Gallery">
          <HeaderText>Gallery</HeaderText>
        </Link>
        <Link to="/">
          <Logo src="logo192.png" />
        </Link>
        <Link to="/About">
          <HeaderText>About</HeaderText>
        </Link>
        <Link to="/Login">
          <HeaderText>
            {Storage.getUserInfo().username == undefined ? "Login" : ""}
          </HeaderText>
        </Link>
        <Link to="/Profile">
          <HeaderText>
            {undefined ? "" : Storage.getUserInfo().username}
          </HeaderText>
        </Link>
        <Link to="/Manager">
          <HeaderText>
            {Storage.getUserInfo().username == undefined ? "" : "Manager"}
          </HeaderText>
        </Link>
      </Space>
      <Routes>
        <Route path="/" element={<Layouts />} exact />
        <Route path="/category" element={<Content />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/gallery" element={<Content />} exact />
        <Route path="/about" element={<Content />} exact />
        <Route path="/profile" element={<Content />} exact />
        <Route path="/manager" element={<ListManager />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default HeaderBar;
