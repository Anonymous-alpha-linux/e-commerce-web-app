import React from 'react';
import { ContainerComponent, Icon, Text } from '../components';
import { useAuthorizationContext } from '../redux';
import TriggerLoading from './triggerLoading';

export default function NotificationContainer() {
    const { user, loadMoreNotification } = useAuthorizationContext();
    return (
        <ContainerComponent>
            <Text.Title
                style={{
                    // color: 'white',
                    textAlign: 'center',
                    margin: '7px 0',
                    fontSize: '20px'
                }}
            >Notification</Text.Title>
            <TriggerLoading loadMore={user.loadMore} loader={loadMoreNotification}>
                <ContainerComponent.Flex
                    className="notification__container"
                    style={{
                        width: '100%',
                        height: '75%',
                        flexDirection: 'column',
                        background: 'white',
                    }}
                >
                    {user.notifications.map(notify => {
                        return <ContainerComponent.Item
                            style={{
                                background: 'rgb(238,245,235)',
                                marginBottom: '3px',
                                padding: '10px 20px',
                                height: '64px'
                            }}>
                            <Text.MiddleLine>
                                <Icon.CircleIcon>
                                    <Icon.Image src={notify.from.profileImage} alt={notify.from.username}></Icon.Image>
                                </Icon.CircleIcon>
                            </Text.MiddleLine>
                            <Text.MiddleLine>
                                <Text.MiddleLine style={{ textIndent: '10px' }}>
                                    <Text.Bold>{notify.from.username}</Text.Bold>
                                </Text.MiddleLine>
                                <Text.MiddleLine style={{ textIndent: '2px' }}>
                                    <Text
                                        style={{ fontSize: '15px' }}>
                                        {notify.message}
                                    </Text>
                                </Text.MiddleLine>
                                <Text.Line
                                    style={{
                                        fontSize: '15px',
                                        color: 'rgb(150,149,149)',
                                        textIndent: '10px'
                                    }}
                                >
                                    {new Date(notify.createdAt).toLocaleString('en-us', {
                                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </Text.Line>
                            </Text.MiddleLine>
                        </ContainerComponent.Item>
                    })}
                </ContainerComponent.Flex>
            </TriggerLoading>
        </ContainerComponent>
    )
}