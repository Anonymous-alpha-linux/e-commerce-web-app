import React, { useState, useEffect, useRef } from "react";
import { ContainerComponent, Form, Icon, LogoIcon, Text } from "../components";
import { useAuthorizationContext } from "../redux";
import useValidate from "../hooks/useValidate";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa'

const Login = () => {
  const { login, user } = useAuthorizationContext();

  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const firstSubmitRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  //toast
  const submitHandler = (e) => {
    e.preventDefault();
    firstSubmitRef.current = true;
    validateInput(() => {
      login(input, () => {
        console.log('loged');
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
  }
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
    }
  }

  if (user.isLoggedIn) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <ContainerComponent>
        <ContainerComponent.Flex className={"signIn"}>
          <ContainerComponent.Inner className={"signIn__green"}>
            {/* <Text.Title style={{fontWeight:"500",fontSize:"25px"}} className={"signIn__text"}>Idea Hub</Text.Title> */}
            <Text.Title className={"signIn__text"}>WELCOME !</Text.Title>
          </ContainerComponent.Inner>
          <ContainerComponent.Inner className={"signIn__content"}>
            <Form className="signIn__form"
              method={"POST"}
              onSubmit={submitHandler}
            >
              <Form.Container className={"signIn__formContainer"}>
                <ContainerComponent.Flex style={{ flexDirection: "column", gap: "30px" }}>
                  <ContainerComponent.Pane>
                    <Icon className={"signIn__icon"}>
                      <FaUserAlt style={{ transform: "translate(-50%,-150%)" }}></FaUserAlt>
                    </Icon>
                    <Text.Title style={{ textAlign: "center", color: "#163d3c", fontSize: "20px" }}>Login</Text.Title>
                  </ContainerComponent.Pane>
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
                    className={"signIn__input"}
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
              {message && <Form.Message style={{ textAlign: "center", color: "green" }}>{message}</Form.Message>}
              {error && <Form.ErrorMessage style={{ textAlign: "center", color: "red" }}>{error}</Form.ErrorMessage>}
            </Form>
          </ContainerComponent.Inner>
        </ContainerComponent.Flex>
      </ContainerComponent>
    </>
  );
};

export default React.memo(Login);
