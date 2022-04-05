import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ContainerComponent } from '../components'
import { Toast } from '../containers'
import { useAuthorizationContext } from '../redux';

export default function Layout() {
    const { user: { isLoggedIn }, toastList, pullToast } = useAuthorizationContext();

    if (isLoggedIn) {
        <Navigate to={"/"} replace></Navigate>
    }

    return <>
        <ContainerComponent.Section style={{
            position: 'fixed',
            bottom: '0',
            right: '10px',
            zIndex: 100,
            padding: '10px',
            maxHeight: '200px'
        }}>
            <ContainerComponent.Flex style={{
                position: 'absolute',
                flexDirection: 'column',
                gap: '10px',
            }}>
                {toastList.map((toast, index) => {
                    return <Toast key={index + 1} message={toast.message} type={toast.type} timeout={toast.timeout || 3000} pullItem={pullToast} />
                })}
            </ContainerComponent.Flex>
        </ContainerComponent.Section>
        <Outlet></Outlet>
    </>
}
