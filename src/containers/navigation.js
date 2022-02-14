import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ContainerComponent, Icon } from '../components';
import NavData from '../fixtures/nav-links.json';
import navigators from '../fixtures/navigator';
import { useAuthorizationContext } from '../redux';

import { AiOutlineMessage } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5'
import { BsList } from 'react-icons/bs';

export default function Navigation() {
    const useAuth = useAuthorizationContext();
    const [screenColumn, setScreenColumn] = React.useState(2);
    const [openNavigator, setOpenNavigator] = React.useState(false);

    const responsiveHandler = () => {
        const { width } = window.screen;
        if (width <= '480px') {
            setScreenColumn(2);
        }
        else {
            setScreenColumn(3);
        }
    }

    useEffect(() => {
        responsiveHandler();
        window.addEventListener('resize', () => {
            responsiveHandler();
        })
        return () => {
            window.removeEventListener('resize', responsiveHandler);
        }
    }, [window.screen.width]);
    console.log(screenColumn > 3);

    return <ContainerComponent>
        <ContainerComponent.Grid columns={screenColumn}>
            <ContainerComponent.Item>
            </ContainerComponent.Item>
            {screenColumn > 2 && <ContainerComponent.Item>
                <ContainerComponent.MiddleInner>
                    <ContainerComponent.Flex>
                        {NavData.map((link, index) => {
                            return <ContainerComponent.Link
                                key={index + 1}
                                path={link.path}>
                                {link.name}
                            </ContainerComponent.Link>
                        })}
                    </ContainerComponent.Flex>
                </ContainerComponent.MiddleInner>
            </ContainerComponent.Item>}
            <ContainerComponent.Item>
                <AuthStatus
                    setOpenNavigator={setOpenNavigator}
                    openNavigator={openNavigator}
                ></AuthStatus>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
        {openNavigator && <Navigator></Navigator>}
    </ContainerComponent>
}

const Navigator = () => {
    return (
        <ContainerComponent style={{
            position: 'fixed',
            bottom: 0,
            left: 0
        }}>
            <ContainerComponent.GridThreeColumns>
                {navigators.map((navigate, index) => (
                    <ContainerComponent.Item key={index + 1}>
                        <ContainerComponent.MiddleInner>
                            <Icon.CircleIcon>
                                {navigate.icon}
                            </Icon.CircleIcon>
                            <Icon.Label>
                                {navigate.label}
                            </Icon.Label>
                        </ContainerComponent.MiddleInner>
                    </ContainerComponent.Item>))}
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}

const Notification = () => {
    return (
        <ContainerComponent>
            <ContainerComponent></ContainerComponent>
        </ContainerComponent>
    )
}


const AuthStatus = React.memo(({ screenColumn, openNavigator, setOpenNavigator }) => {
    const { user, logout } = useAuthorizationContext();

    if (!user.isLoggedIn) return <div style={{
        textAlign: 'right'
    }}>
        <Link to={'/login'} onClick={logout}>Login</Link>
    </div>


    return <ContainerComponent.Flex style={{
        justifyContent: 'flex-end'
    }}>
        <ContainerComponent.Item>
            <Icon.CircleIcon>
                <AiOutlineMessage></AiOutlineMessage>
            </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
            <Icon.CircleIcon>
                <IoNotificationsOutline></IoNotificationsOutline>
            </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
            {
                screenColumn < 3 &&
                <Icon.CircleIcon onClick={() => setOpenNavigator(!openNavigator)}>
                    <BsList></BsList>
                </Icon.CircleIcon>
                ||
                <Link to={'/'} onClick={logout}>Logout</Link>
            }
        </ContainerComponent.Item>


    </ContainerComponent.Flex>
});