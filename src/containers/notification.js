import React from 'react';
import { ContainerComponent, Text } from '../components';

export default function NotificationContainer() {
    return (
        <ContainerComponent.Flex
            className="notification__container"
            style={{
                position: 'fixed',
                width: '100%',
                height: '75%',
                top: '50px',
                right: 0,
                flexDirection: 'column',
                background: 'white',
                border: '3px solid black'
            }}
        >
            <Text.Title
                style={{
                    // color: 'white',
                    textAlign: 'center',
                    margin: '7px 0',
                    fontSize: '20px'
                }}
            >Notification</Text.Title>
            <ContainerComponent.Item
                style={{
                    background: 'rgb(238,245,235)',
                    marginBottom: '3px',
                    padding: '10px 20px',
                    height: '64px'
                }}
            >
                <Text.Subtitle
                    style={{ fontSize: '15px' }}
                >Notification Title</Text.Subtitle>
                <Text
                    style={{
                        fontSize: '15px',
                        color: 'rgb(150,149,149)'
                    }}
                >
                    Notification time
                </Text>
            </ContainerComponent.Item>

            <ContainerComponent.Item
                style={{
                    background: 'rgb(238,245,235)',
                    marginBottom: '3px',
                    padding: '10px 20px',
                    height: '64px'
                }}
            >
                <Text.Subtitle
                    style={{ fontSize: '15px' }}
                >Notification Title</Text.Subtitle>
                <Text
                    style={{
                        fontSize: '15px',
                        color: 'rgb(150,149,149)'
                    }}
                >
                    Notification time
                </Text>
            </ContainerComponent.Item>

            <ContainerComponent.Item
                style={{
                    background: 'rgb(238,245,235)',
                    marginBottom: '3px',
                    padding: '10px 20px',
                    height: '64px'
                }}
            >
                <Text.Subtitle
                    style={{ fontSize: '15px' }}
                >Notification Title</Text.Subtitle>
                <Text
                    style={{
                        fontSize: '15px',
                        color: 'rgb(150,149,149)'
                    }}
                >
                    Notification time
                </Text>
            </ContainerComponent.Item>
        </ContainerComponent.Flex>
    )
}