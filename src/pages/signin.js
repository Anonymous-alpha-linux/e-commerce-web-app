import React, { useState, useEffect } from 'react';
import { ContainerComponent, Form, Text } from '../components';
import { useAuthorizationContext } from '../redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, user } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        login(input);
    }
    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [input])

    if (user.isLoggedIn) {
        return <Navigate to={'/'} state={{ from: location }} replace />;
    }

    return <ContainerComponent>
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
            {/* <Form.Logo image="">
            </Form.Logo> */}
            <Form.Container>
                <Form.Title style={{
                    border: 'unset'
                }}>
                    LOG IN
                </Form.Title>
                <Text.Line>
                    <Form.Input
                        placeholder="Email"
                        type='text'
                        name="email"
                        onChange={inputHandler}
                        autoComplete={'true'}
                        value={input.name}
                    ></Form.Input>
                </Text.Line>
                <Form.Input
                    placeholder="Password"
                    type='password'
                    name="password"
                    onChange={inputHandler}
                    autoComplete='current-password'
                ></Form.Input>
                <Link to='/reset_password'>
                    <Text.Bold>
                        Have a problem ?
                    </Text.Bold>
                </Link>
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
    </ContainerComponent>
}

export default React.memo(Login);