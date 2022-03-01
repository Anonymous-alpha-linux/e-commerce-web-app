import { ContainerComponent, Form } from "../components";
import React, { useState } from 'react';


const ForgotPassword = () => {
    const [input, setInput] = useState({});
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
    }

    const inputHandler = React.useCallback((e) => {
        setInput(oldInput => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value
            }
        })
    }, [input, setInput])

    return (
        <>
            <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
            <Form
                method={'POST'}
                onSubmit={submitHandler}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    zIndex: '1',
                }}>
                <Form.Logo
                    image="https://cdn.shopify.com/s/files/1/1811/9799/t/6/assets/logo.png?v=15221948588626818280"
                ></Form.Logo>
                <Form.Container>
                    <Form.Title
                        children="We will send you an email to reset your password."
                    ></Form.Title>
                    <Form.Input
                        type='text'
                        name="email"
                        onChange={inputHandler}
                        placeholder="Input Your Email"
                    ></Form.Input>
                    <Form.Input
                        type='submit'
                        style={{
                            background: 'black',
                            color: '#fff'
                        }}
                        value="submit"
                    >
                    </Form.Input>
                </Form.Container>
            </Form>
        </>
    );
}

export default React.memo(ForgotPassword);
