import { Switch } from 'react-router-dom';
import './App.css';
import Students from './Component/Students';
import { Route } from 'react-router-dom';
import Addstudents from './Component/Addstudents';
import UpdateStudent from './Component/UpdateStudent';
import Nopage from './Component/Nopage';
import { Redirect } from 'react-router-dom';
import DashBoard from './Component/Dashboard';




function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
         <DashBoard/>
        </Route> 
        
        <Route path="/students">
        <Students
        />
        </Route>

        <Route path="/details">
          <Redirect to = "/students"/>
        </Route>

        <Route path="/add">
          <Addstudents
          />
        </Route>

        <Route path="/Edit/:id">
          <UpdateStudent
          />
        </Route>

        <Route path="**">
         <Nopage/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
