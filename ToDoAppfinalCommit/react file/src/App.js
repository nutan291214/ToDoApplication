import React from 'react'

import SignUp from './Component/SignUp'
import Login from './Component/Login'
import Admin from './Component/Admin'
import UserDetails from './Component/UserDetails'
import Logout from './Component/Logout'
import { Route,Switch } from 'react-router-dom'

import Home from './Component/Home'
import Report from './Component/Report'

function App() {
  
  return (
    
    <div className="App">
      
    
    <Switch>
     
   <Route exact path="/" component={Home} />
      
  <Route exact path="/login" component={Login} />
    
    <Route exact path="/addUser" component={SignUp} />
      
  <Route exact path="/user" component={UserDetails} />
     
   <Route exact path="/admin" component={Admin} />
     
   <Route exact path="/report" component={Report}></Route>
      
  <Route exact path="/logout" component={Logout} />
     
   </Switch>
       
    
    </div>
    );
  }
  
  
  export default App;
  