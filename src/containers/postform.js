import React from 'react';
import { Container } from 'react-bootstrap';
import {ContainerComponent, Text, Form, Icon} from '../components';

export default function PostForm() {
    return <ContainerComponent style={{
        padding: '10px',
    }}>
        <ContainerComponent.Flex style={{alignItems: 'center'}}>
            <ContainerComponent.Item>
            <Icon.CircleIcon style={{size: '15px',}}>
                Avatar
            </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
            <ContainerComponent.Pane>
                <Text.Title style={{fontSize: '10px'}}>Staff Name</Text.Title>
                <Form.Input placeholder="Post your idea"></Form.Input>
            </ContainerComponent.Pane>
            </ContainerComponent.Item>
        </ContainerComponent.Flex>
    </ContainerComponent>
}