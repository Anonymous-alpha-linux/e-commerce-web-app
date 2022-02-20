import React, { useState, useEffect } from 'react';
import { ContainerComponent, Form } from '../components';
import { useAuthorizationContext } from '../redux';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { login, user, setUser, auth } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [error, setError] = useState('');

    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    useEffect(() => {
        console.log(user);
        setUser({
            accessToken: 'a.b.c'
        });
    }, []);
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
        <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
        <ContainerComponent.Hero>
        </ContainerComponent.Hero>
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
                    autoComplete='current-password'
                ></Form.Input>
                <Link to='/reset_password'>Forgot your Password?</Link>
                <Form.Input
                    type="submit"
                    value='sign in'
                    onClick={submitHandler}
                    style={{
                        background: 'black',
                        color: '#fff'
                    }}>

                </Form.Input>
                {error && <p>{error}</p>}
            </Form.Container>
        </Form>
    </>
}

export default React.memo(Login);