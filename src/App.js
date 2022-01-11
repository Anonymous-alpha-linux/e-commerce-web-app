import { Fragment } from "react";
import { Home } from './pages';
import { Nav } from './containers'

function App() {
  return (
    <Fragment>
      <Nav></Nav>
      <Home></Home>
    </Fragment>
  );
}

export default App;
