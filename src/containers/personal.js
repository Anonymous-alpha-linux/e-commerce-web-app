import React from 'react';
import {ContainerComponent, Icon, ButtonComponent, Form, Text} from '../components';
import { BsFillPersonFill } from 'react-icons/bs';

export default function Personal() {
    return <ContainerComponent style={{
        padding: '10px',
    }}>
        <ContainerComponent.Inner>
        <ContainerComponent.Grid columns={3}>
            <ContainerComponent.Item>
            </ContainerComponent.Item>
            <ContainerComponent.Item style={{alignItems:'center'}}>
            <Icon.CircleIcon>
                <BsFillPersonFill />
            </Icon.CircleIcon>
            <Text.Subtitle>Staff Name</Text.Subtitle>
            <Text.Subtitle>Digital Marketing</Text.Subtitle>
            <Form.Input placeholder="Post your information"></Form.Input>
            <Form.Input placeholder="Post your information"></Form.Input>
            <Form.Input placeholder="Post your information"></Form.Input>
            <Form.Input placeholder="Post your information"></Form.Input>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
        <ContainerComponent.Grid columns={3}>
            <ContainerComponent.Item>
            </ContainerComponent.Item>
            <ContainerComponent.Item></ContainerComponent.Item>
            <ContainerComponent.Item>
            <ButtonComponent>
                Save
            </ButtonComponent>
            <ButtonComponent>
                Edit
            </ButtonComponent>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
        </ContainerComponent.Inner>
    </ContainerComponent>
}