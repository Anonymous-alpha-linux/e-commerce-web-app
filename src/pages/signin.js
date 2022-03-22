import React, { useState, useEffect } from "react";
import { ContainerComponent, Form } from "../components";
import { useAuthorizationContext } from "../redux";
import useValidate from "../hooks/useValidate";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuthorizationContext();

  const [input, setInput] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  //toast
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      Object.entries(input).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        const validate = new useValidate(value);
        if (key === "email") validate.isEmpty().isEmail();
        else if (key === "password") validate.isEmpty();
      });
      login(input);
    } catch (error) {
      setError(error.message);
    }
  };
  const inputHandler = React.useCallback(
    (e) => {
      setInput((oldInput) => {
        return {
          ...oldInput,
          [e.target.name]: e.target.value,
        };
      });
    },
    [input]
  );

  if (user.isLoggedIn) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
      <ContainerComponent.Hero></ContainerComponent.Hero>
      <Form className="sign-in__root"
        method={"POST"}
        onSubmit={submitHandler}
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px 10px 10px 10px',
          position: "absolute",
          width: "100%",
          maxWidth: "550px",
          minWidth: "335px",
          padding: "10px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "10",
        }}
      >
        <Form.Container>
          <Form.Title>LOG IN</Form.Title>
          <Form.Input
            placeholder="Email"
            type="text"
            name="email"
            onChange={inputHandler}
            autoComplete={"true"}
            value={input.name}
          ></Form.Input>

          <Form.Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={inputHandler}
            autoComplete="current-password"
          ></Form.Input>
          {/* <Link to="/reset_password">Forgot your Password?</Link> */}
          <Form.Input
            type="submit"
            value="sign in"
            onClick={submitHandler}
            style={{
              background: "black",
              color: "#fff",
              textTransform: 'uppercase',
            }}
          ></Form.Input>
        </Form.Container>

        {message && <Form.Message>{message}</Form.Message>}
        {error && <Form.ErrorMessage>{error}</Form.ErrorMessage>}
      </Form>
    </>
  );
};

export default React.memo(Login);
