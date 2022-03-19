import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from '../../containers';
import { AdminContext } from '../../redux';

export default function Admin() {
    return (
        <AdminContext>
            <DashboardHeader>
                <Outlet></Outlet>
            </DashboardHeader>
        </AdminContext>
    );
}
