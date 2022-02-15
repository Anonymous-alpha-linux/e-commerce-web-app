import React from 'react';
import {ContainerComponent, Icon, ButtonComponent, Form, Text} from '../components';
import { BsFillPersonFill } from 'react-icons/bs';

export default function ManagerInfo() {
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
            <Text.Subtitle>Manager Name</Text.Subtitle>
            <Text.Subtitle>Digital Marketing</Text.Subtitle>
            <Text.Paragraph>
                Manager Name
                Manager Age
            </Text.Paragraph>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
        </ContainerComponent.Inner>
    </ContainerComponent>
}