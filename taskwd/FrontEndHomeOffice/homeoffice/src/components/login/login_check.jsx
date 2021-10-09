import React from 'react'
import { useNavigate ,useLocation } from 'react-router-dom';
import axios from 'axios';
import Login from './login';

export default function Login_check(props) {
const [loggedIn, setloggedIn] = React.useState(false);
const navigate  = useNavigate();
props.func(loggedIn)
const location = useLocation();

const api = 'http://127.0.0.1:8000/me/'; 
const token = localStorage.getItem('accessToken');

if (token && !loggedIn){
axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
.then(res => {
console.log(res.data);
setloggedIn(true);
localStorage.setItem('HOuser', res.data.user);
console.log('Location on login check ' + location.pathname);
if (location.pathname === '/login'){navigate('counter')} 

})
.catch((error) => {
  console.log(error);
  setloggedIn(false)
});
}

if (!loggedIn){
  
  return (
    
    <div className="App">
      <header className="App-header">
  <Login/>
  </header>
   </div>
  )
  
};
return null
   
}
