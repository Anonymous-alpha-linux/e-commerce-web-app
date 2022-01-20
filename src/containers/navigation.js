import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerComponent } from '../components';
import NavData from '../fixtures/nav-links.json';
import { useAuthorizationContext } from '../hooks';

export default function Navigation() {
    const { user } = useAuthorizationContext();

    console.log(user);
    
    return (
        <ContainerComponent>
            <ContainerComponent.Grid columns={3}>
                <ContainerComponent.Item>
                    <h1>This is logo</h1>
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
                    {user.isLoggedIn && <h1>This is Cart</h1> || <Link to={'/login'}>Login</Link>}
                </ContainerComponent.Item>
            </ContainerComponent.Grid>
        </ContainerComponent>
    )
}
