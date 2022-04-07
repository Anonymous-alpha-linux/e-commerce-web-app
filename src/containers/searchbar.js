import React, { useState } from 'react'
import { ContainerComponent, Form, Text } from '../components'

export default function Searchbar({ }) {
    const [input, setInput] = useState('');
    return (
        <ContainerComponent style={{ background: 'transparent' }}>
            <ContainerComponent.Inner style={{ maxWidth: '680px', margin: '0 auto' }}>
                <Form style={{ maxWidth: 'unset' }}>
                    <Text.Title>Search modal</Text.Title>
                    <Form.Input placeholder="Search post / author"></Form.Input>
                </Form>
            </ContainerComponent.Inner>
        </ContainerComponent>
    )
}
