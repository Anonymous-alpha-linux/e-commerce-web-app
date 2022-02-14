import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/main.scss';

import { Home, Login, ProtectedPage, Register, ForgetPassword, Nav, Staff, QACoordinator, AdminSidebar, Admin, QAManager } from './pages';
import { useAuthorizationContext } from "./redux";

function App() {
  const { user } = useAuthorizationContext();

  return (
    <Fragment>
      <BrowserRouter>
        {user.role === "admin" && <AdminSidebar></AdminSidebar> || <Nav></Nav>}
        <Routes>
          <Route path="/" element={<Home></Home>}>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="/reset_password" element={<ForgetPassword></ForgetPassword>}></Route>
            {
              // 1. Admin Role
              user.role === 'admin' &&
              <Route path=""
                index
                element={<ProtectedPage authorized={['admin']}>
                  <Admin></Admin>
                </ProtectedPage>}>
              </Route> ||
              // 2. QA manager
              user.role === 'QA_manager' &&
              <Route path=""
                index
                element={<ProtectedPage authorized={['admin', 'QA_manager']}>
                  <QAManager></QAManager>
                </ProtectedPage>}>
              </Route> ||
              // 3. QA coordinator
              user.role === 'QA_coordinator' &&
              <Route path=""
                index
                element={<ProtectedPage authorized={['admin', 'QA_manager', 'QA_coordinator']}>
                  <QACoordinator></QACoordinator>
                </ProtectedPage>}>
              </Route> ||
              // 4. Staff
              user.role === "staff" &&
              <Route path=""
                index
                element={<ProtectedPage>
                  <Staff></Staff>
                </ProtectedPage>}>
              </Route>
            }
          </Route>
          {
            user.role === 'admin' && <Route path="/about" element={<ProtectedPage authorized={['admin']}>
              <Admin.About></Admin.About>
            </ProtectedPage>}></Route>
          }

          {/* <Route path="/admin" element={<ProtectedPage authorized={["admin"]}> <Home></Home> </ProtectedPage>}>
            <Route path="" index element={<ProtectedPage authorized={['admin']}>
              <Admin></Admin>
            </ProtectedPage>}>
            </Route>
          </Route> */}

          <Route path="/*" element={<h1>Error Handling...</h1>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
