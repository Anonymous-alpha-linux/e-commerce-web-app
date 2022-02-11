import React from 'react'
import { Outlet } from 'react-router-dom'
import { ContainerComponent } from '../components';

export default function Home() {
    return (
        <ContainerComponent>
            <ContainerComponent.Hero>
            </ContainerComponent.Hero>
            <Outlet></Outlet>
        </ContainerComponent>
    )
}
