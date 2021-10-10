import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  useNavigate,
  Routes
} from 'react-router-dom';
import Login from './components/login/login';
import Login_api from './components/login/login_api';
import Counter from './components/counter/counter';
import axios from 'axios';
import Login_check from './components/login/login_check';
import Logout from './components/login/logout';
import TimePicker from './components/timepicker/TimePicker';
import { Item } from './components/login/logout';

function App() {
  const [loggedIn, setloggedIn] = React.useState(localStorage.getItem("login"));
  const [user, setUser] = React.useState();

  return (
    <div className="App">
       <BrowserRouter>

      {loggedIn? <Logout user = {user}/> :<Item>Please Log In</Item>}
      <header className="App-header">
       <div>
       
       <Login_check func={setloggedIn} user = {setUser}/>

  {loggedIn && (    
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/api" element={<Login_api />} />
        <Route path="/timepicker" element={<TimePicker />} />
      </Routes>
      )
    }
        </div>

      </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
