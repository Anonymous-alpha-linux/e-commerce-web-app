import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ButtonComponent, ContainerComponent, Icon, Text } from '../components';
import NavData from '../fixtures/nav-links.json';
import navigators from '../fixtures/navigator';
import { useAuthorizationContext } from '../redux';

import { AiOutlineMessage } from 'react-icons/ai';
import { IoNotificationsOutline, IoLogoApple, IoSearchSharp } from 'react-icons/io5'
import { BsList } from 'react-icons/bs';
import ConditionContainer from './condition';

export default function Navigation() {
    const useAuth = useAuthorizationContext();
    const [screenColumn, setScreenColumn] = React.useState(2);
    const [openNavigator, setOpenNavigator] = React.useState(false);
    const [openNotification, setOpenNotification] = React.useState(false);

    const responsiveHandler = () => {
        const { width } = window.screen;

        if (width <= 480) {
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


    return <ContainerComponent className="navigation__container" style={{
        background: '#163d3c',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 100
    }}>
        <ContainerComponent.Grid columns={screenColumn}>
            <ContainerComponent.Item>
                <ContainerComponent.Flex style={{
                    alignItems: 'center'
                }}>
                    <ContainerComponent.Item>
                        <Icon.CircleIcon>
                            <IoLogoApple></IoLogoApple>
                        </Icon.CircleIcon>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Text style={{
                            paddingLeft: '0',
                            color: '#fff',
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            lineHeight: '100%',
                            margin: 0,
                        }}>
                            <IoSearchSharp></IoSearchSharp>
                        </Text>
                    </ContainerComponent.Item>
                </ContainerComponent.Flex>
            </ContainerComponent.Item>
            {screenColumn > 2 && <ContainerComponent.Item>
                {/* <ContainerComponent.MiddleInner>
                    <ContainerComponent.Flex>
                        {NavData.map((link, index) => {
                            return <ContainerComponent.Link
                                key={index + 1}
                                path={link.path}>
                                {link.name}
                            </ContainerComponent.Link>
                        })}
                    </ContainerComponent.Flex>
                </ContainerComponent.MiddleInner> */}
            </ContainerComponent.Item>}
            <ContainerComponent.Item>
                <AuthStatus
                    screenColumn={screenColumn}
                    openNavigator={() => setOpenNavigator(true)}
                    setOpenNotification={setOpenNotification}
                ></AuthStatus>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
        {openNavigator && <Navigator closeNavigator={() => setOpenNavigator(false)}></Navigator>}
    </ContainerComponent>
}

const Navigator = ({ closeNavigator }) => {

    return (
        <ContainerComponent style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 10000,
            borderRadius: '20px 20px 0 0',
            background: '#333',
            color: '#fff',
            padding: '10px'
        }}>
            <ContainerComponent.BackDrop onClick={closeNavigator}>
            </ContainerComponent.BackDrop>
            <ContainerComponent.GridThreeColumns>
                {navigators.map((navigate, index) => (
                    <ContainerComponent.Item key={index + 1}>
                        <ContainerComponent.MiddleInner>
                            <Icon.CircleIcon>
                                {navigate.icon}
                            </Icon.CircleIcon>
                            <Icon.Label style={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                            }}>
                                {navigate.label}
                            </Icon.Label>
                        </ContainerComponent.MiddleInner>
                    </ContainerComponent.Item>))}
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}


const AuthStatus = React.memo(({ screenColumn, openNavigator, setOpenNotification }) => {
    const { user, logout } = useAuthorizationContext();

    if (!user.isLoggedIn) return <div style={{
        textAlign: 'right'
    }}>
        <Link to={'/login'} onClick={logout}>Login</Link>
    </div>


    return <ContainerComponent.Flex style={{
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
    }}>
        <ContainerComponent.Item>
            <Icon.CircleIcon>
                <AiOutlineMessage></AiOutlineMessage>
            </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
            <Icon.CircleIcon onClick={() => setOpenNotification(open => !open)}>
                <IoNotificationsOutline></IoNotificationsOutline>
            </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
            {
                screenColumn < 3 &&
                <Icon.CircleIcon onClick={openNavigator}>
                    <BsList></BsList>
                </Icon.CircleIcon>
                ||
                <ButtonComponent>
                    <Link to={'/'} onClick={logout}>Logout</Link>
                </ButtonComponent>
            }
        </ContainerComponent.Item>
    </ContainerComponent.Flex>
});