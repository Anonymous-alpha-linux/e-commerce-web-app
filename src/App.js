import { Fragment } from "react";
import { Home, Login, Register } from './pages';
import { Nav } from './containers'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/main.scss';
import { AuthenticateContext } from "./hooks";
function App() {
  return (
    <Fragment>
      <AuthenticateContext>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/product" element={<Home></Home>}></Route>
            <Route path="/category" element={<Home></Home>}></Route>
            <Route path="/event" element={<Home></Home>}></Route>
            <Route path="/question" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/*" element={<h1>Error Handling...</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthenticateContext>
    </Fragment>
  );
}

export default App;
