import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateActivity from './components/CreateActivity/CreateActivity';
import CardDetails from './components/CardDetails/CardDetails';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
       <Route exact path = {'/'} component = {LandingPage}></Route>               
        <Route exact path = {'/activities'} component = {CreateActivity}></Route>
        <Route exact path = {'/home'} component = {Home}></Route>        
        <Route path = {"/details/:id"} render ={props =>{ const R = props.match.params.id 
        return <CardDetails R = {R}></CardDetails>}}/>
       
        <Route path = '/' component = {NotFound}></Route> 
      </Switch>      
    </div>
    </BrowserRouter>
  
  );
}

export default App;
