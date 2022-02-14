import React from 'react';
import { ContainerComponent, Form } from '../components';

const Changepassword = () => {
    return (
        <ContainerComponent>
            <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
            <Form style={{
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
                    <Form.Title children="Change Your Password"></Form.Title>
                    <Form.InputGroup>
                        <Form.Input 
                        placeholder="Input New PassWord"
                        type="password"
                        >
                        </Form.Input>
                        <Form.Input
                        placeholder="Confirm Your Password"
                        type="password"
                        >
                        </Form.Input>
                    </Form.InputGroup>
                    <Form.Button
                        href={''}
                        style={{
                            background: 'black'
                        }}
                    >
                        change
                    </Form.Button>
                </Form.Container>
            </Form>
        </ContainerComponent>
    );
}

export default Changepassword;
