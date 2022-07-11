import React from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:8000/';
  const navigate = useNavigate();
  let token = localStorage.getItem('jwt');
  
  const logout = async () => {
    token = localStorage.getItem('jwt');
    fetch(`${API}users/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then(response => {
      if(response.status === 500){
        throw new Error('Error occured')
      }
      localStorage.removeItem('jwt')
      console.log('logged out')
      navigate('/')
    })
    .catch(error => console.log(error))
  }

  
  return ( 
    <nav className="navbar">
      <h1>Price Tracker</h1>
      <div className="links">
        <button className='button-1' onClick={logout}>logout</button>
      </div>
    </nav>
   );
}
 
export default Navbar;