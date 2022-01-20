import React from 'react';
import { Form } from '../components'

export default function Register() {
    return <Form>
        <Form.Logo image="https://cdn.shopify.com/s/files/1/1811/9799/t/6/assets/logo.png?v=15221948588626818280"></Form.Logo>
        <Form.Container>
            <Form.Title children='Register or Get out!'></Form.Title>
            <Form.Input placeholder="Email"></Form.Input>
            <Form.Input placeholder="Password"></Form.Input>
            <Form.Input placeholder="Confirm Your Password"></Form.Input>
            <Form.Button style={{
                background: 'black',
                color: '#fff'
            }}>register</Form.Button>
            <Form.Button style={{
                background: '#f2f2f2'
            }}>back to login</Form.Button>
        </Form.Container>
    </Form>
}
