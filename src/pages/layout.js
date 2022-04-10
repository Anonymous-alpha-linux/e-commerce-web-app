import React from 'react'
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
        <MessageList toastList={toastList} pullToast={pullToast}></MessageList>
        <Outlet></Outlet>
    </>
}

const MessageList = React.memo(({ toastList, pullToast }) => {
    return <ContainerComponent.Section style={{
        position: 'fixed',
        top: '50px',
        right: '10px',
        zIndex: 1000,
        // padding: '10px',
        maxHeight: '200px'
    }}>
        <ContainerComponent.Flex style={{
            position: 'absolute',
            right: 0,
            flexDirection: 'column',
            gap: '10px',
        }}>
            {toastList.map((toast, index) => {
                return <Toast message={toast.message} key={index + 1} type={toast.type} timeout={toast.timeout || 3000} pullItem={pullToast} />
            })}
        </ContainerComponent.Flex>
    </ContainerComponent.Section>
})
