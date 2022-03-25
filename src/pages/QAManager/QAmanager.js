import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../../containers';
import { AdminContext } from '../../redux';
import { SinglePost } from '../../containers';

export default function QAManager() {
    return <AdminContext>
        <SinglePost></SinglePost>
        <DashboardHeader>
            <Outlet></Outlet>
        </DashboardHeader>
    </AdminContext>;
}
