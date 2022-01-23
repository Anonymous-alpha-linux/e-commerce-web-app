import React from 'react';
import { Outlet } from 'react-router-dom';
import { ContainerComponent } from '../components';

export default function Layout() {

    return <ContainerComponent>
        <Outlet></Outlet>
    </ContainerComponent>;
}
