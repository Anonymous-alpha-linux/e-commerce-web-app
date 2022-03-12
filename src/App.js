import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home, Login, ProtectedPage, Register, ForgetPassword, Nav,
  Staff,
  QACoordinator,
  AdminSidebar, Admin,
  QAManager,
  Workspace, Profile, QA,
  Portal,
  WorkspaceGroup,
  Loading,
  MyPost,
  DashboardManager,
  CategoryManagement,
  ListMember,
  StaffCRUD
} from './pages';

import { AddGroupContainer, ManagerInfo, MessageContainer, NotificationContainer, Personal, PostModal, Searchbar } from "./containers";
import { useAuthorizationContext, NotifyContext } from "./redux";
import roles from './fixtures/roles';
import './scss/main.scss';
import { MessageBox } from "./components";
import Signout from "./pages/signout";

function App() {
  const { user } = useAuthorizationContext();

  return (
    <NotifyContext>
      <BrowserRouter>
        {user.role === roles.ADMIN && <AdminSidebar></AdminSidebar> || <Nav></Nav>}
        <Routes>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
          <Route path="logout" element={<Signout></Signout>}></Route>
          <Route path="reset_password" element={<ForgetPassword></ForgetPassword>}></Route>
          <Route path="/" element={<Home></Home>}>
            {
              // 1. Admin Role
              (user.role === roles.ADMIN && <Route path=""
                element={<ProtectedPage authorized={[roles.ADMIN]}>
                  <Admin></Admin>
                </ProtectedPage>}>
              </Route>) ||
              // 2. QA manager
              (user.role === roles.QA_MANAGER && <Route path=""
                element={<ProtectedPage authorized={[roles.QA_MANAGER]}>
                  <QAManager></QAManager>
                </ProtectedPage>}>
                {/* <Route index element={<Workspace></Workspace>} /> */}
                <Route index element={<DashboardManager></DashboardManager>} />
                <Route path="/management/category" element={<CategoryManagement></CategoryManagement>} />
                <Route path="/management/member" element={<ListMember></ListMember>} />
                <Route path="/management/staff" element={<StaffCRUD></StaffCRUD>} />
              </Route>) ||
              // 3. QA coordinator
              (user.role === roles.QA_COORDINATOR && <Route path=""
                element={<ProtectedPage authorized={[roles.QA_COORDINATOR]}>
                  <QACoordinator></QACoordinator>
                </ProtectedPage>}>
                <Route index element={<Workspace></Workspace>} />
                <Route path="/management/category" element={<CategoryManagement></CategoryManagement>} />
              </Route>) ||
              // 4. Staff
              (user.role === roles.STAFF &&
                <Route
                  path=""
                  element={<ProtectedPage authorized={[roles.STAFF]}>
                    <Staff></Staff>
                  </ProtectedPage>}>
                  <Route index element={<Workspace></Workspace>}></Route>
                  <Route path="profile" element={<Profile></Profile>}>
                    <Route path="personal" element={<Personal></Personal>} />
                    <Route path="manager" element={<ManagerInfo></ManagerInfo>} />
                  </Route>
                  <Route path="history" element={<MyPost></MyPost>} />
                  <Route path="q&a" element={<QA></QA>}></Route>
                  <Route path="portal/" element={<Portal></Portal>}>
                    <Route path="idea" element={<PostModal />} >
                    </Route>
                    <Route path="idea/:id" element={<PostModal />} >
                    </Route>
                    <Route path="notification" element={<NotificationContainer></NotificationContainer>} />
                    <Route path="message" element={<MessageContainer></MessageContainer>}>
                      <Route path=":id" element={<MessageBox></MessageBox>}></Route>
                    </Route>
                    <Route path="search" element={<Searchbar></Searchbar>} />
                    <Route path="addgroup" element={<AddGroupContainer></AddGroupContainer>} />
                  </Route>
                  <Route path="workspace" element={<WorkspaceGroup></WorkspaceGroup>} />
                </Route>)}
          </Route>
          <Route path="/*" element={<h1>404 Error: Page Not Found...</h1>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </NotifyContext>
  );
}

export default App;
