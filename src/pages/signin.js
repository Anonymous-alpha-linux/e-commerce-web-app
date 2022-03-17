import React, { useState, useEffect } from "react";
import { ContainerComponent, Form } from "../components";
import { useAuthorizationContext } from "../redux";
import useValidate from "../hooks/useValidate";
import actions from "../redux/reducers/actions";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user, setUser } = useAuthorizationContext();
  const [input, setInput] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //toast
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      Object.entries(input).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        const validate = new useValidate(value);
        if (key === "email") validate.isEmpty().isEmail();
        else if (key === "password") validate.isEmpty();
      });
      await login(input);
    } catch (error) {
      setError(error.message);
      setMessage("");
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
      <Form
        method={"POST"}
        onSubmit={submitHandler}
        style={{
          position: "absolute",
          width: "95%",
          maxWidth: "550px",
          minWidth: "335px",
          padding: "10px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "1",
        }}
      >
        <Form.Logo image=""></Form.Logo>
        <Form.Container>
          <Form.Title>LOG IN</Form.Title>
          <Form.Input
            style={{ marginBottom: "10px" }}
            placeholder="Email"
            type="text"
            name="email"
            onChange={inputHandler}
            autoComplete={"true"}
            value={input.name}
          ></Form.Input>
          <Form.Input
            style={{ marginBottom: "10px" }}
            placeholder="Password"
            type="password"
            name="password"
            onChange={inputHandler}
            autoComplete="current-password"
          ></Form.Input>
          <Link to="/reset_password">Forgot your Password?</Link>
          <Form.Input
            type="submit"
            value="sign in"
            onClick={submitHandler}
            style={{
              background: "black",
              color: "#fff",
              marginTop: "10px",
            }}
          ></Form.Input>
        </Form.Container>

        {message && (
          <Form.Message
            style={{
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {`* ${message}`}
          </Form.Message>
        )}
        {error && (
          <Form.ErrorMessage
            style={{
              color: "red",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {`* ${error}`}
          </Form.ErrorMessage>
        )}
      </Form>
    </>
  );
};

export default React.memo(Login);
