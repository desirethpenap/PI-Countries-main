import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
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
       <Route exact path = '/' component = {LandingPage}></Route>
        <Route exact path = '/about' component = {About}></Route>        
        <Route exact path = '/activities' component = {CreateActivity}></Route>
        <Route exact path = '/home' component = {Home}></Route>        
        <Route path = "/home/:id" component = {CardDetails}></Route>
        <Route path = '/' component = {NotFound}></Route> 
      </Switch>      
    </div>
    </BrowserRouter>
  
  );
}

export default App;
