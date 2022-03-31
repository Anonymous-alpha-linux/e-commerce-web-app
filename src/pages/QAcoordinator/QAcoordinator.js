import React from 'react';
import { Outlet } from 'react-router-dom';
import { ContainerComponent } from '../../components';
import { Nav } from '../../containers';
export default function QACoordinator() {
    return <>
        <Nav></Nav>
        <ContainerComponent className="qa-coordinator__root">
            <Outlet></Outlet>
        </ContainerComponent>;
    </>
}
