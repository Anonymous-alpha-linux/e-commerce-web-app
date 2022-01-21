import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerComponent } from '../components';
import NavData from '../fixtures/nav-links.json';
import { useAuthorizationContext } from '../redux';

export default function Navigation() {
    const { response, loading, logout } = useAuthorizationContext();
    console.log('islogged', response.isLoggedIn);
    return (
        <ContainerComponent>
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
                    {loading && <p>loading...</p>
                        || response.isLoggedIn && <ContainerComponent.Flex>
                            <p>
                                {response.role}<br />
                                {response.account}
                            </p>
                            <Link to={'/'} onClick={logout}>Logout</Link>
                        </ContainerComponent.Flex>
                        || <Link to={'/login'}>Login</Link>}
                </ContainerComponent.Item>
            </ContainerComponent.Grid>
        </ContainerComponent>
    )
}
