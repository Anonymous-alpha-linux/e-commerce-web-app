import React, { useEffect, useState } from 'react';
import { Form } from '../components';
import { mainAPI } from '../config';
import { useAuthorizationContext } from '../hooks';
import axios from 'axios';

export default function Login() {
    const { user, response, setUser, setResponse } = useAuthorizationContext();
    const [input, setInput] = useState({});
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('start submit');
        axios.post(mainAPI.LOCALHOST_LOGIN,
            { ...input })
            .then(response => {
                console.log(response);
                setResponse(
                    response.data
                );
                setUser(oldUser => {
                    localStorage.setItem('accessToken',
                        response.data.accessToken
                    );
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(accessToken);

                    return {
                        accessToken: localStorage.getItem('accessToken'),
                    }
                })
            }).catch(err => setError(err.message));

    }

    const inputHandler = (e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }

    return <Form method={'POST'} >
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
                onClick={submitHandler} style={{
                    background: 'black',
                    color: '#fff'
                }}>
                sign in
            </Form.Button>
            <Form.Button style={{
                background: '#f2f2f2'
            }}>register</Form.Button>
            {error && <p>{error}</p>}
        </Form.Container>
    </Form>
}