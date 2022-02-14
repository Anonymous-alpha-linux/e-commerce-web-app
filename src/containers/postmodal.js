import React from 'react'
import { ContainerComponent, Form, Text, Button } from '../components'
import { useAuthorizationContext } from '../redux';

export default function PostModal() {
    const { socket } = useAuthorizationContext();

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit("post", "posted a new post");
    }

    return (
        <ContainerComponent>
            <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
            <ContainerComponent.Inner style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)'
            }}>
                <Form onSubmit={submitHandler}>
                    <Text>This is Form Modal</Text>
                    <button onClick={submitHandler}>Submit</button>
                </Form>
            </ContainerComponent.Inner>
        </ContainerComponent>
    )
}
