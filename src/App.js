import { Fragment } from "react";
import { Home, Login, ProtectedPage, PublicPage, Register } from './pages';
import { Nav } from './containers'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/main.scss';
import { AuthenticateContext } from "./redux";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthenticateContext>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home></Home>}>
              <Route path="login" element={<Login></Login>}></Route>
              <Route path="register" element={<Register></Register>}></Route>
            </Route>

            <Route path="/auth" element={<ProtectedPage></ProtectedPage>}>
            </Route>

            <Route path="/*" element={<h1>Error Handling...</h1>}></Route>
          </Routes>
        </AuthenticateContext>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
