import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerComponent, Icon, Text } from '../components';
import { useNotifyContext } from '../redux';
import TriggerLoading from './triggerLoading';

export default function NotificationContainer() {
    const { notify, loadMoreNotifications } = useNotifyContext();

    return <ContainerComponent className="notification__container">
        <Text.Title
            style={{
                textAlign: 'center',
                margin: '7px 0',
                fontSize: '20px'
            }}
        >Notification</Text.Title>
        <TriggerLoading loadMore={notify.more} loader={loadMoreNotifications}>
            <ContainerComponent.Flex
                className="notification__container"
                style={{
                    width: '100%',
                    height: '75%',
                    flexDirection: 'column',
                    background: 'white',
                }}
            >
                {notify.notifications.map((notify, index) => {
                    return <ContainerComponent.Item
                        key={index}
                        style={{
                            background: 'rgb(238,245,235)',
                            marginBottom: '3px',
                            padding: '10px 20px',
                            height: '64px'
                        }}>
                        <Link to={notify.url}>
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
                        </Link>
                    </ContainerComponent.Item>
                })}
            </ContainerComponent.Flex>
        </TriggerLoading>
    </ContainerComponent>
}