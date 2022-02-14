import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, ProtectedPage, Register, ForgetPassword, Nav, Staff, QACoordinator, AdminSidebar, Admin, QAManager, Workspace, Profile, QA } from './pages';
import { useAuthorizationContext } from "./redux";
import { roles } from './fixtures';
import './scss/main.scss';

function App() {
  const { user } = useAuthorizationContext();

  return (
    <Fragment>
      <BrowserRouter>
        {user.role === roles.ADMIN && <AdminSidebar></AdminSidebar> || <Nav></Nav>}
        <Routes>
          <Route path="/" element={<Home></Home>}>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="reset_password" element={<ForgetPassword></ForgetPassword>}></Route>
            {
              // 1. Admin Role
              user.role === roles.ADMIN &&
              <Route path=""
                index
                element={<ProtectedPage authorized={[roles.ADMIN]}>
                  <Admin></Admin>
                </ProtectedPage>}>
              </Route> ||
              // 2. QA manager
              user.role === roles.QA_MANAGER &&
              <Route path=""
                element={<ProtectedPage authorized={[roles.QA_MANAGER]}>
                  <QAManager></QAManager>
                </ProtectedPage>}>
              </Route> ||
              // 3. QA coordinator
              user.role === roles.QA_COORDINATOR &&
              <Route path=""
                element={<ProtectedPage authorized={[roles.QA_COORDINATOR]}>
                  <QACoordinator></QACoordinator>
                </ProtectedPage>}>
              </Route> ||
              // 4. Staff
              user.role === roles.STAFF && <>
                <Route path=""
                  element={<ProtectedPage authorized={[roles.STAFF]}>
                    <Staff></Staff>
                  </ProtectedPage>}>
                  <Route index element={<Workspace></Workspace>}></Route>
                  <Route path="profile" element={<Profile></Profile>}></Route>
                  <Route path="q&a" element={<QA></QA>}></Route>
                </Route>
              </>
            }
          </Route>
          {
            user.role === 'admin' && <Route path="/about" element={<ProtectedPage authorized={[roles.STAFF]}>
              <Admin.About></Admin.About>
            </ProtectedPage>}></Route>
          }

          {/* <Route path="/admin" element={<ProtectedPage authorized={["admin"]}> <Home></Home> </ProtectedPage>}>
            <Route path="" index element={<ProtectedPage authorized={['admin']}>
              <Admin></Admin>
            </ProtectedPage>}>
            </Route>
          </Route> */}

          <Route path="/*" element={<h1>404 Error: Page Not Found...</h1>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
