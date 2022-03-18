import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../../containers';

export default function QAManager() {
    return <>
        <DashboardHeader>
            <Outlet></Outlet>
        </DashboardHeader>
    </>;
}
