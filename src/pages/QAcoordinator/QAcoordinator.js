import React from 'react';
import { Outlet } from 'react-router-dom';
import { ContainerComponent } from '../../components';
import { Nav } from '../../containers';
import { AdminContext } from '../../redux';
export default function QACoordinator() {
    return <AdminContext>
        <Nav></Nav>
        <ContainerComponent className="qa-coordinator__root" style={{ minHeight: '100vh', background: 'rgb(169, 195, 158)' }}>
            <Outlet></Outlet>
        </ContainerComponent>
    </AdminContext>
}
