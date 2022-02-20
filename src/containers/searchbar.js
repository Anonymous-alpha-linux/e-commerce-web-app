import React, { useState } from 'react'
import { Form, Text } from '../components'

export default function Searchbar({ }) {
    const [input, setInput] = useState('');
    return (
        <Form>
            <Text.Title>Search modal</Text.Title>
            <Form.Input placeholder="Search post/username/workspace"></Form.Input>
        </Form>
    )
}
