import React from 'react';
import { ContainerComponent } from '../../components';
import { Outlet } from 'react-router-dom';
export default function Staff() {
    return <ContainerComponent className="staff__root" style={{
        height: '100%'
    }}>
        <Outlet></Outlet>
    </ContainerComponent>;
}
