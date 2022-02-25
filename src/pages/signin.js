import React, { useState, useEffect } from 'react';
import { ContainerComponent, Form } from '../components';
import { useAuthorizationContext } from '../redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, user } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = async (e) => {
        e.preventDefault();
        await login(input);
        if (user.isLoggedIn) {
            navigate('/', {
                replace: true,
            });
        }
    }
    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [input, setInput])

    console.log(user);
    if (user.isLoggedIn) {
        return <Navigate to={'/'} state={{ from: location }} replace />;
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
                <Form.Title>
                    LOG IN
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
            </Form.Container>

            {message && <Form.Message>{message}</Form.Message>}
            {error && <Form.ErrorMessage>{error}</Form.ErrorMessage>}
        </Form>
    </>
}

export default React.memo(Login);