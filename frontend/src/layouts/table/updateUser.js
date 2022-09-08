// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Button,
//   FormGroup,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
// } from "reactstrap";
// import "antd/dist/antd.min.css";
// import { Checkbox, Divider, Space } from "antd";

// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   LockOutlined,
//   UserOutlined,
//   FacebookFilled,
//   GooglePlusSquareFilled,
//   TwitterSquareFilled,
// } from "@ant-design/icons";
// import {
//   Contain,
//   BgLogin,
//   ContentBox,
//   AuthFormButton,
//   LogoSignIn,
// } from "../../styles";
// import {
//   setTokenInfo,
//   setUserLoginInfo,
//   setRememberMeInfo,
// } from "../../redux/actions/userLoginInfoActions";
// import { selectRememberMe } from "../../redux/selectors/userLoginInfoSelector";
// import { connect } from "react-redux";
// import UserApi from "../../api/UserApi";
// import Storage from "../../Storage/Storage";

// const updateUser = (props) => {
//   const [isOpenModal, setOpenModal] = useState(false);
//   const [email, setEmail] = useState("");

//   const [isDisableResendButton, setDisableResendButton] = useState(false);

//   const resendEmailToActiveAccount = async () => {
//     setDisableResendButton(true);
//     await UserApi.resendEmailToActiveAccount(email);
//     setDisableResendButton(false);
//   };

//   const redirectToLogin = () => {
//     props.history.push("/");
//   };

//   return (
//     <div>
//       {/* <ContentBox> */}
//       <Formik
//         initialValues={{
//           firstname: "",
//           lastname: "",
//           username: "",
//           email: "",
//           password: "",
//         }}
//         validationSchema={Yup.object().shape({
//           firstname: Yup.string()
//             .max(50, "Must be less than 50 characters")
//             .required("Required"),

//           lastname: Yup.string()
//             .max(50, "Must be less than 50 characters")
//             .required("Required"),

//           username: Yup.string()
//             .min(6, "Must be between 6 and 50 characters")
//             .max(50, "Must be between 6 and 50 characters")
//             .required("Required")
//             .test(
//               "checkExistsUsername",
//               "This username is already registered.",
//               async (username) => {
//                 // call api
//                 const isExists = await UserApi.existsByUsername(username);
//                 return !isExists;
//               }
//             ),

//           email: Yup.string()
//             .email("Invalid email address")
//             .required("Required")
//             .test(
//               "checkExistsEmail",
//               "This email is already registered.",
//               async (email) => {
//                 // call api
//                 const isExists = await UserApi.existsByEmail(email);
//                 return !isExists;
//               }
//             ),

//           password: Yup.string()
//             .min(6, "Must be between 6 and 50 characters")
//             .max(50, "Must be between 6 and 50 characters")
//             .required("Required"),
//         })}
//         onSubmit={async (values) => {
//           try {
//             // call api
//             await UserApi.create(
//               values.firstname,
//               values.lastname,
//               values.username,
//               values.email,
//               values.password
//             );

//             console.log("a");
//             // message
//             alert("Success");
//             // setEmail(values.email);
//             // setOpenModal(true);
//           } catch (error) {
//             // redirect page error server
//             // props.history.push("/");
//             console.log(error);
//           }
//         }}
//         validateOnChange={false}
//         validateOnBlur={false}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <h1>Login</h1>
//             <Space direction="vertical" size="middle">
//               {/* firstname */}
//               <FormGroup style={{ height: "50px" }}>
//                 <UserOutlined />{" "}
//                 <Field
//                   type="text"
//                   name="firstname"
//                   placeholder="Enter your firstname"
//                   style={{
//                     height: "35px",
//                     width: "215px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ErrorMessage
//                   name="firstname"
//                   component="div"
//                   style={{ color: "red" }}
//                 />
//               </FormGroup>
//               {/* lastname */}
//               <FormGroup style={{ height: "50px" }}>
//                 <UserOutlined />{" "}
//                 <Field
//                   type="text"
//                   name="lastname"
//                   placeholder="Enter your lastname"
//                   style={{
//                     height: "35px",
//                     width: "215px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ErrorMessage
//                   name="lastname"
//                   component="div"
//                   style={{ color: "red" }}
//                 />
//               </FormGroup>
//               {/* username */}
//               <FormGroup style={{ height: "50px" }}>
//                 <UserOutlined />{" "}
//                 <Field
//                   type="text"
//                   name="username"
//                   placeholder="Enter your username"
//                   style={{
//                     height: "35px",
//                     width: "215px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ErrorMessage
//                   name="username"
//                   component="div"
//                   style={{ color: "red" }}
//                 />
//               </FormGroup>
//               {/* email */}
//               <FormGroup style={{ height: "50px" }}>
//                 <UserOutlined />{" "}
//                 <Field
//                   type="text"
//                   name="email"
//                   placeholder="Enter your email"
//                   style={{
//                     height: "35px",
//                     width: "215px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   style={{ color: "red" }}
//                 />
//               </FormGroup>
//               {/* password */}
//               <FormGroup style={{ height: "50px" }}>
//                 <LockOutlined />{" "}
//                 <Field
//                   prefix={<LockOutlined />}
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   style={{
//                     height: "35px",
//                     width: "215px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   style={{ color: "red" }}
//                 />
//               </FormGroup>
//               <ErrorMessage
//                 name="errorForm"
//                 component="div"
//                 style={{ display: "block", color: "red" }}
//               />

//               {/* submit */}
//               <AuthFormButton>
//                 <Button
//                   type="submit"
//                   color="primary"
//                   size="lg"
//                   disabled={isSubmitting}
//                 >
//                   Sign up
//                 </Button>
//               </AuthFormButton>
//             </Space>
//             {/* <Divider plain>or</Divider>
//                   <LogoSignIn>
//                     <Space size={30}>
//                       <Link to="/Login">
//                         <FacebookFilled style={{ color: "#4267b2" }} />
//                       </Link>
//                       <Link to="/Login">
//                         <GooglePlusSquareFilled style={{ color: "#EA4335" }} />
//                       </Link>
//                       <Link to="/Login">
//                         <TwitterSquareFilled style={{ color: "#1DA1F2" }} />
//                       </Link>
//                     </Space>
//                   </LogoSignIn>
//                   Don't have Account <Link to="/Login">Sign Up</Link> */}
//           </Form>
//         )}
//       </Formik>
//       {/* <Modal isOpen={isOpenModal}> */}
//       {/* header */}
//       {/* <ModalHeader>You need to confirm your account</ModalHeader> */}

//       {/* body */}
//       {/* <ModalBody className="m-3"> */}
//       {/* <p className="mb-0">
//               We have sent an email to <b>{email}</b>.
//             </p>
//             <p className="mb-0">Please check your email to active account</p>
//           </ModalBody> */}

//       {/* footer */}
//       {/* <ModalFooter>
//             <Button
//               color="primary"
//               onClick={resendEmailToActiveAccount}
//               disabled={isDisableResendButton}
//             >
//               Resend
//             </Button>{" "}
//             <Button color="primary" onClick={redirectToLogin}>
//               Login
//             </Button>
//           </ModalFooter>
//         </Modal> */}
//       {/* </ContentBox> */}
//     </div>
//   );
// };

// const mapGlobalStateToProps = (state) => {
//   return {
//     // isRememberMe: selectRememberMe(state),
//   };
// };

// // export default connect(mapGlobalStateToProps, {
// //   setTokenInfo,
// //   setUserLoginInfo,
// //   setRememberMeInfo,
// // })(SignUp);

// export default updateUser;
