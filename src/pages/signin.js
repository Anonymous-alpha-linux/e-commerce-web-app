import React, { useState, useEffect, useRef } from "react";
import { ContainerComponent, Form, Icon, LogoIcon, Text } from "../components";
import { useAuthorizationContext } from "../redux";
import useValidate from "../hooks/useValidate";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Login = () => {
  const { login, user } = useAuthorizationContext();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const firstSubmitRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  //toast
  const submitHandler = async (e) => {
    e.preventDefault();
    firstSubmitRef.current = true;
    validateInput(() => {
      login(input, () => {
        console.log("loged");
        navigate("/");
      });
    });
  };
  const inputHandler = (e) => {
    if (firstSubmitRef.current) {
    }
    setInput((oldInput) => {
      return {
        ...oldInput,
        [e.target.name]: e.target.value,
      };
    });
  };
  const validateInput = async (cb) => {
    try {
      await Object.entries(input).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        const validate = new useValidate(value);

        if (key === "email") validate.isEmpty().isEmail();
        else if (key === "password") validate.isEmpty();
      });
      cb();
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  if (user.isLoggedIn) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <ContainerComponent>
        <ContainerComponent.Flex className="signIn">
          <ContainerComponent.Inner className="signIn__green">
            <ContainerComponent.Pane style={{transform:"translateY(-50%)"}}>
              <Text.Title className="signIn__text">WELCOME !</Text.Title>
              <Text.Title className="signIn__subText">Sign in to continute access the IdeaHub</Text.Title>
            </ContainerComponent.Pane>  
          </ContainerComponent.Inner>
          <ContainerComponent.Inner className="signIn__content">
                  <ContainerComponent.Pane className="signIn__loginTitle">
                    <Text.Title style={{ textAlign: "center", color: "#163d3c", fontSize: "28px",marginBottom:"10px" }}>Hello!</Text.Title>
                    <ContainerComponent.Flex className="signIn__login">
                      <Text.Title style={{ textAlign: "center", color: "#163d3c", fontSize: "21px" }}>Login</Text.Title>
                      <Text.Title style={{ fontSize: "20px",fontWeight:"350",width:"fit-content" }}>Your Account</Text.Title>
                    </ContainerComponent.Flex>
                  </ContainerComponent.Pane>
            <Form className="signIn__form"
              method={"POST"}
              onSubmit={submitHandler}
            >
              <Form.Container className="signIn__formContainer">
                <ContainerComponent.Flex style={{ flexDirection: "column", gap: "30px" }}>
                  <Form.Input
                    className={"signIn__input"}
                    placeholder="Email"
                    type="text"
                    name="email"
                    onChange={inputHandler}
                    autoComplete={"true"}
                    value={input.name}
                  ></Form.Input>

                  <Form.Input
                    className="signIn__input"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={inputHandler}
                    autoComplete="current-password"
                  ></Form.Input>
                  {/* <Link to="/reset_password">Forgot your Password?</Link> */}
                  <Form.Input
                    type="submit"
                    value="Log in"
                    onClick={submitHandler}
                    className="signIn__button"
                  ></Form.Input>
                </ContainerComponent.Flex>
              </Form.Container>
              {message && (
                <Form.Message style={{ textAlign: "center", color: "green" }}>
                  {message}
                </Form.Message>
              )}
              {error && (
                <Form.ErrorMessage
                  style={{ textAlign: "center", color: "red" }}
                >
                  {error}
                </Form.ErrorMessage>
              )}
            </Form>
          </ContainerComponent.Inner>
        </ContainerComponent.Flex>
      </ContainerComponent>
    </>
  );
};

export default React.memo(Login);
