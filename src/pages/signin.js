import React, { useState, useEffect } from 'react';
import { ContainerComponent, Form } from '../components';
import { useAuthorizationContext } from '../redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = React.memo(() => {
    const { response, login } = useAuthorizationContext();
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({});
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            login(input);

            if (!response.isLoggedIn) throw new Error("You must login first !");

        } catch (error) {
            setError(e.message);
        }
    }

    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [setInput])

    useEffect(() => {
        if (response.isLoggedIn) {
            navigate(from, { replace: true });
        }
        setLoading(false);
    }, [response]);

    if (loading) return <h1>Loading...</h1>

    return <ContainerComponent>
        <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
        <Form method={'POST'}
            onSubmit={submitHandler}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: '1',
            }}>
            <Form.Logo image="https://cdn.shopify.com/s/files/1/1811/9799/t/6/assets/logo.png?v=15221948588626818280">
            </Form.Logo>
            <Form.Container>
                <Form.Title children="Log in or Get out!">
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
                // value={input.password}
                ></Form.Input>
                <Form.Link>Forgot your Password?</Form.Link>
                <Form.Button
                    onClick={submitHandler}
                    style={{
                        background: 'black',
                        color: '#fff'
                    }}>
                    sign in
                </Form.Button>
                <Form.Button href={'/register'}
                    style={{
                        background: '#f2f2f2'
                    }}>
                    register
                </Form.Button>
                {error && <p>{error}</p>}
            </Form.Container>
        </Form>
    </ContainerComponent>
})

export default Login;