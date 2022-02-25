import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ContainerComponent, Form } from '../components'
import { useAuthorizationContext } from '../redux';

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
        <ContainerComponent.Hero>
        </ContainerComponent.Hero>
        <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
        <ContainerComponent.Hero>
        </ContainerComponent.Hero>
        <Form method={'POST'}
            onSubmit={submitHandler}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: '1',
            }}
        >
            <Form.Logo image=""></Form.Logo>
            <Form.Container>
                <Form.Title children='Register or Get out!'></Form.Title>
                <Form.Input placeholder="Username"
                    type='text'
                    name="username"
                    onChange={inputHandler}
                    value={input.name}></Form.Input>
                <Form.Input placeholder="Email"
                    type='text'
                    name="email"
                    onChange={inputHandler}
                    value={input.name}></Form.Input>
                <Form.Input placeholder="Password"
                    type='password'
                    name="password"
                    onChange={inputHandler}></Form.Input>
                <Form.Input placeholder="Confirm Your Password"
                    type='password'
                    name="repeat-password"
                    onChange={inputHandler}></Form.Input>
                <Form.Button onClick={submitHandler}
                    style={{
                        background: 'black',
                        color: '#fff'
                    }}>register</Form.Button>
                <Form.Button
                    href={'/login'}
                    style={{
                        background: '#f2f2f2'
                    }}
                >back to login</Form.Button>
                {error && <p>{error}</p>}
            </Form.Container>
        </Form>
    </>
}

export default React.memo(Register);