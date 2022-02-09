import React from 'react'
import { Outlet } from 'react-router-dom'
import { ContainerComponent } from '../components';
import { useAuthorizationContext } from '../redux';

export default function Home() {
    return (
        <ContainerComponent>
            <ContainerComponent.Hero>
            </ContainerComponent.Hero>
            <Outlet></Outlet>
        </ContainerComponent>
    )
}
