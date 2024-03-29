// import logo from './logo.svg';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Switch, Route} from 'react-router-dom'
import { LandingPage, MenuPage, DashboardPage, SingleUserPage, AllUserPage, CertificatePage } from './pages'

function App() {
  return (
    // <div className="App">
    //   <Button variantColor={"orange"}>Button</Button>
    // </div>
    <Switch>
      <Route path="/" exact={true} component={ LandingPage } />
      <Route path="/menu" exact={true} component={ MenuPage } />
      <Route path="/dashboard/:id" exact={true} component={ DashboardPage } />
      <Route path="/dashboard/:id/user/:userid" exact={true} component={ SingleUserPage } />
      <Route path="/dashboard/:id/users/all" exact={true} component={ AllUserPage } />
      <Route path="/certificate" exact={true} component={ CertificatePage } />
    </Switch>
  );
}

export default App;
