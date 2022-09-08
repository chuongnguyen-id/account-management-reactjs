import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import "antd/dist/antd.min.css";
import { Checkbox, Divider, Space } from "antd";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GooglePlusSquareFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import {
  Contain,
  BgLogin,
  ContentBox,
  AuthFormButton,
  LogoSignIn,
} from "../../../styles";
import {
  setTokenInfo,
  setUserLoginInfo,
  setRememberMeInfo,
} from "../../../redux/actions/userLoginInfoActions";
import { selectRememberMe } from "../../../redux/selectors/userLoginInfoSelector";
import { connect } from "react-redux";
import LoginApi from "../../../api/LoginApi";
import Storage from "../../../Storage/Storage";

const SignIn = (props) => {
  const [isRememberMe, setRememberMe] = useState(props.isRememberMe);

  return (
    <div>
      <BgLogin bgImg="/assets/banners/home.jpg">
        <Contain>
          <ContentBox>
            <Formik
              initialValues={{
                username: "",
                password: "",
                errorForm: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .required("Please input your Username!")
                  .max(50, "Must be 6 to 50 characters")
                  .min(6, "Must be 6 to 50 characters"),

                password: Yup.string()
                  .max(50, "Must be 6 to 50 characters")
                  .min(6, "Must be 6 to 50 characters")
                  .required("Please input your Password!"),
              })}
              onSubmit={async (values, { setFieldError }) => {
                try {
                  const result = await LoginApi.login(
                    values.username,
                    values.password
                  );
                  console.log(result, ": result");
                  // login successfully!
                  // save remember me to storage
                  Storage.setRememberMe(isRememberMe);
                  // save token to storage
                  Storage.setToken(result.token);
                  // save user info to storage
                  const user = {
                    firstname: result.firstName,
                    lastname: result.lastName,
                    username: result.userName,
                    email: result.email,
                    role: result.role,
                    status: result.status,
                  };
                  Storage.setUserInfo(user);
                  console.log(user, ": user");
                  // save remember me to redux
                  props.setRememberMeInfo(isRememberMe);
                  // save token to redux
                  props.setTokenInfo(result.token);
                  // save user info to redux
                  props.setUserLoginInfo(user);

                  // redirect home page
                  window.location.replace("/");
                } catch (error) {
                  if (error.response.status === 401) {
                    setFieldError("errorForm", "Wrong username or password!");
                  } else {
                    setFieldError(
                      "errorForm",
                      "There is an error from the server"
                    );
                  }
                  console.log(error.response);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1>Login</h1>
                  <Space direction="vertical" size="middle">
                    {/* username */}
                    <FormGroup style={{ height: "50px" }}>
                      <UserOutlined />{" "}
                      <Field
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        style={{
                          height: "35px",
                          width: "215px",
                          borderRadius: "8px",
                        }}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormGroup>

                    {/* password */}
                    <FormGroup style={{ height: "50px" }}>
                      <LockOutlined />{" "}
                      <Field
                        prefix={<LockOutlined />}
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        style={{
                          height: "35px",
                          width: "215px",
                          borderRadius: "8px",
                        }}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormGroup>
                    <ErrorMessage
                      name="errorForm"
                      component="div"
                      style={{ display: "block", color: "red" }}
                    />
                    {/* remember me */}
                    <div>
                      <Checkbox
                        name="rememberMe"
                        checked={isRememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ float: "left" }}
                      >
                        Remember me
                      </Checkbox>
                      <small>
                        <Link to="/Login" style={{ float: "right" }}>
                          Forgot password?
                        </Link>
                      </small>
                    </div>
                    {/* forgot password */}

                    {/* submit */}
                    <AuthFormButton>
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </Button>
                    </AuthFormButton>
                  </Space>
                  <Divider plain>or</Divider>
                  <LogoSignIn>
                    <Space size={30}>
                      <Link to="/Login">
                        <FacebookFilled style={{ color: "#4267b2" }} />
                      </Link>
                      <Link to="/Login">
                        <GooglePlusSquareFilled style={{ color: "#EA4335" }} />
                      </Link>
                      <Link to="/Login">
                        <TwitterSquareFilled style={{ color: "#1DA1F2" }} />
                      </Link>
                    </Space>
                  </LogoSignIn>
                  Don't have Account <Link to="/Login">Sign Up</Link>
                </Form>
              )}
            </Formik>
          </ContentBox>
        </Contain>
      </BgLogin>
    </div>
  );
};

const mapGlobalStateToProps = (state) => {
  return {
    isRememberMe: selectRememberMe(state),
  };
};

export default connect(mapGlobalStateToProps, {
  setTokenInfo,
  setUserLoginInfo,
  setRememberMeInfo,
})(SignIn);
