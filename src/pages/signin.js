import React, { useState } from 'react';
import { ContainerComponent, Form } from '../components';
import { useAuthorizationContext } from '../redux';
import { Navigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { login, user } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [error, setError] = useState('');

    const location = useLocation();
    let from = location.state?.from?.pathname || '/';


    const submitHandler = async (e) => {
        e.preventDefault();
        await login(input);
    }

    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [input, setInput])

    // if (user.role === 'admin') return <Navigate to={'/admin'} state={{ from: location }} replace />;

    if (user.isLoggedIn) {
        return <Navigate to={from} state={{ from: location }} replace />;
    }

    return <>
        <ContainerComponent.Hero>
        </ContainerComponent.Hero>
        <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
        <Form method={'POST'}
            onSubmit={submitHandler}
            style={{
                position: 'absolute',
                width: '95%',
                maxWidth: '550px',
                minWidth: '335px',
                padding: '10px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: '1',
            }}>
            <Form.Logo image="">
            </Form.Logo>
            <Form.Container>
                <Form.Title children="LOG IN">
                </Form.Title>
                <Form.Input
                    placeholder="Email"
                    type='text'
                    name="email"
                    onChange={inputHandler}
                    value={input.name}
                ></Form.Input>
                <Form.Input
                    placeholder="Password"
                    type='password'
                    name="password"
                    onChange={inputHandler}
                    autocomplete='current-password'
                // value={input.password}
                ></Form.Input>
                <Form.Link href='/reset_password'>Forgot your Password?</Form.Link>
                <Form.Button
                    onClick={submitHandler}
                    style={{
                        background: 'black',
                        color: '#fff'
                    }}>
                    sign in
                </Form.Button>
                {error && <p>{error}</p>}
            </Form.Container>
        </Form>
    </>
}

export default React.memo(Login);