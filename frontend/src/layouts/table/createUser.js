import React from "react";

import { Button, FormGroup } from "reactstrap";
import { AuthFormButton } from "../../styles";
import { Space, Modal } from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserApi from "../../api/UserApi";

const CreateUser = (props) => {
  // const [isOpenModal, setOpenModal] = useState(false);

  // const [email, setEmail] = useState("");

  // const [isDisableResendButton, setDisableResendButton] = useState(false);

  // const resendEmailToActiveAccount = async () => {
  //   setDisableResendButton(true);
  //   await UserApi.resendEmailToActiveAccount(email);
  //   setDisableResendButton(false);
  // };

  const success = () => {
    Modal.success({
      content: `Create Success!`,
    });
  };

  return (
    <>
      <h1 className="h2">Create User</h1>

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .max(50, "Must be less than 50 characters")
            .required("Please input your FirstName!"),

          lastname: Yup.string()
            .max(50, "Must be less than 50 characters")
            .required("Required"),

          username: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Please input your Username!")
            .test(
              "checkExistsUsername",
              "This username is already registered.",
              async (username) => {
                // call api
                const isExists = await UserApi.existsByUsername(username);
                return !isExists;
              }
            ),

          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
            .test(
              "checkExistsEmail",
              "This email is already registered.",
              async (email) => {
                // call api
                const isExists = await UserApi.existsByEmail(email);
                return !isExists;
              }
            ),

          password: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Please input your Password!"),

          confirmPassword: Yup.string()
            .required("Please input your Password!")
            .when("password", {
              is: (value) => (value && value.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Confirm Password do not match"
              ),
            }),
        })}
        onSubmit={async (values) => {
          try {
            // call api
            await UserApi.create(
              values.firstname,
              values.lastname,
              values.username,
              values.email,
              values.password
            );

            // message
            // setEmail(values.email);
            // setOpenModal(success);
            success();
          } catch (error) {
            console.log(error);
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form style={{ textAlign: "right" }}>
            <Space direction="vertical" size="small">
              <FormGroup style={{ height: "50px" }}>
                <span>FirstName: </span>
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Enter your firstname"
                  style={{
                    height: "35px",
                    width: "215px",
                    borderRadius: "8px",
                  }}
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormGroup>
              <FormGroup style={{ height: "50px" }}>
                <span>LastName: </span>
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Enter your lastname"
                  style={{
                    height: "35px",
                    width: "215px",
                    borderRadius: "8px",
                  }}
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormGroup>
              <FormGroup style={{ height: "50px" }}>
                <span>UserName: </span>
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
              <FormGroup style={{ height: "50px" }}>
                <span>Email: </span>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  style={{
                    height: "35px",
                    width: "215px",
                    borderRadius: "8px",
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormGroup>
              <FormGroup style={{ height: "50px" }}>
                <span>Password: </span>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
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
              <FormGroup style={{ height: "50px" }}>
                <span>Confirm Password: </span>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter confirm Password"
                  style={{
                    height: "35px",
                    width: "215px",
                    borderRadius: "8px",
                  }}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormGroup>
              <AuthFormButton>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </AuthFormButton>
            </Space>
          </Form>
        )}
      </Formik>

      {/* <Modal
        title="Create success!"
        style={{ top: 20 }}
        visible={isOpenModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        You need to confirm your account
        <p className="mb-0">
          We have sent an email to <b>{email}</b>.
        </p>
        <p className="mb-0">Please check your email to active account</p>
        <Button
          color="primary"
          onClick={resendEmailToActiveAccount}
          disabled={isDisableResendButton}
        >
          Resend
        </Button>
      </Modal> */}
    </>
  );
};

export default CreateUser;
