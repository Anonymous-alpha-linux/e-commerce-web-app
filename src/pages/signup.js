import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ContainerComponent, Form,Text,Icon } from '../components'
import { useAuthorizationContext } from '../redux';
import {FaUserAlt} from 'react-icons/fa'

function Register() {
    const { user, register } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [error, setError] = useState('');

    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            console.log("start register");
            if (!input.username || !input.username || !input.password) throw new Error("Fulfill input");
            if (input.password !== input['repeat-password']) throw new Error("Your confirm password is incorrectly")
            register(input);
        } catch (error) {
            setError(error.message);
        }
    }
    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [setInput]);

    if (user.isLoggedIn) {
        return <Navigate to={from} state={{ from: location }} replace>
        </Navigate>
    }

    return <>
        <ContainerComponent>
            <ContainerComponent.Flex className="signIn">
                <ContainerComponent.Inner className="signIn__green">
                    <Text.Title className={"signIn__text"}>WELCOME !</Text.Title>
                </ContainerComponent.Inner>
                <ContainerComponent.Inner className="signIn__content">
                    <Form method={'POST'}
                        onSubmit={submitHandler}
                        className="signIn__form"
                    >
                        <Form.Container className="signIn__formContainer" style={{ display:"flex",flexDirection:"column", gap: "30px" }}>
                            <ContainerComponent.Pane>
                                <Icon className={"signIn__icon2"}>
                                    <FaUserAlt style={{transform:"translate(-50%,-150%)"}}></FaUserAlt>
                                </Icon>
                                <Text.Title style={{ textAlign: "center", color: "#163d3c", fontSize: "20px" }}>Register Đê</Text.Title>
                            </ContainerComponent.Pane>
                            <Form.Input 
                                className={"signIn__input"}
                                placeholder="Username"
                                type='text'
                                name="username"
                                onChange={inputHandler}
                                value={input.name}></Form.Input>
                            <Form.Input 
                                className={"signIn__input"}
                                placeholder="Email"
                                type='text'
                                name="email"
                                onChange={inputHandler}
                                value={input.name}></Form.Input>
                            <Form.Input 
                                className={"signIn__input"}
                                placeholder="Password"
                                type='password'
                                name="password"
                                onChange={inputHandler}></Form.Input>
                            <Form.Input 
                                className={"signIn__input"}
                                placeholder="Confirm Your Password"
                                type='password'
                                name="repeat-password"
                                onChange={inputHandler}></Form.Input>
                            <ContainerComponent.Flex style={{flexDirection:"column",gap:"20px"}}>
                                <Form.Button className="signIn__button" onClick={submitHandler}>Register</Form.Button>
                                <Form.Button
                                    href={'/login'}
                                    className="signIn__button"
                                >Back to Login</Form.Button>
                                {error && <Form.Message style={{ textAlign: "center", color: "red" }}>{error}</Form.Message>}
                            </ContainerComponent.Flex>
                        </Form.Container>
                    </Form>
                </ContainerComponent.Inner>
            </ContainerComponent.Flex>
        </ContainerComponent>
    </>
}

export default React.memo(Register);