import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ContainerComponent } from "../components";
import { Toast } from "../containers";
import { toastTypes } from '../fixtures';
import {
  useAuthorizationContext,
  PostContext,
  WorkspaceContext,
} from "../redux";

export default function Home() {
  const { user, toastList, pushToast, pullToast } = useAuthorizationContext();
  const location = useLocation();
  React.useEffect(() => {
    pushToast({
      message: "start toast at home",
      type: toastTypes.SUCCESS
    })
  }, []);
  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return (
    <WorkspaceContext>
      <PostContext>
        <ContainerComponent.Flex style={{
          // position: 'fixed',
          // right: 0,
          // bottom: 0,
          padding: '10px'
        }}>
          {!!toastList.length && toastList.map((toast, index) => {
            console.log(toast);
            <Toast key={index + 1} message={toast.message} type={toast.type} timeout={3000} pullItem={pullToast} />
          })}
        </ContainerComponent.Flex>
        <Outlet></Outlet>
      </PostContext>
    </WorkspaceContext>
  );
}
