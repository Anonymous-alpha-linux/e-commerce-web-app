import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/main.scss';


import { Home, Login, ProtectedPage, Register, Nav, Layout, Staff, Customer, AdminSidebar, Admin } from './pages';
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
            {
              user.role === 'admin' &&
              <Route path=""
                index
                element={<ProtectedPage authorized={['admin']}>
                  <Admin></Admin>
                </ProtectedPage>}>
              </Route> ||

              user.role === "staff" &&
              <Route path=""
                index
                element={<ProtectedPage authorized={['admin', 'staff']}>
                  <Staff></Staff>
                </ProtectedPage>}>
              </Route> ||

              <Route path=""
                index
                element={<Customer></Customer>}>
              </Route>
            }

          </Route>

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
