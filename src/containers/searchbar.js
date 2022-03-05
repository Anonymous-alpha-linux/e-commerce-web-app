import React, { useState } from 'react'
import { ContainerComponent, Form, Text } from '../components'

export default function Searchbar({ }) {
    const [input, setInput] = useState('');
    return (
        <ContainerComponent>
            <Form>
                <Text.Title>Search modal</Text.Title>
                <Form.Input placeholder="Search post/username/workspace"></Form.Input>
            </Form>
        </ContainerComponent>
    )
}
