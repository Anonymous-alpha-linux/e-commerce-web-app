import React, { useEffect } from 'react';
import { ContainerComponent, Icon, ButtonComponent, Form, Text } from '../components';
import { BsFillPersonFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useAuthorizationContext } from '../redux';

export default function Personal() {
    const { id } = useParams();
    const { user } = useAuthorizationContext();
    useEffect(() => {
        console.log(id);
        console.log(user);
    }, [id]);

    return <ContainerComponent
        style={{
            padding: '10px'
        }}>
        <ContainerComponent.Inner>
            <ContainerComponent.Grid columns={3}>
                <ContainerComponent.Item>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ alignItems: 'center' }}>
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