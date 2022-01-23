import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerComponent } from '../components';
import NavData from '../fixtures/nav-links.json';
import { useAuthorizationContext } from '../redux';

export default function Navigation() {
    const useAuth = useAuthorizationContext();

    return (<ContainerComponent>
        <ContainerComponent.Grid columns={3}>
            <ContainerComponent.Item>
                <p>This is logo</p>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
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
            </ContainerComponent.Item>
            <ContainerComponent.Item>
                <AuthStatus {...useAuth}></AuthStatus>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
    </ContainerComponent>
    )
}

const AuthStatus = React.memo(() => {
    const { user, logout } = useAuthorizationContext();

    if (!user.isLoggedIn) return <Link to={'/login'} onClick={logout}>Login</Link>

    return <ContainerComponent.Flex>
        <p>
            {user.role}<br />
            {user.account}
        </p>
        <Link to={'/'} onClick={logout}>Logout</Link>
    </ContainerComponent.Flex>
});