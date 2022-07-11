import {useNavigate} from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:8000/';

  const navigate = useNavigate();
  const [isErr, setIsErr] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginSubmit = async (e) => {
    e.preventDefault()
    console.log(email,'logged in')
    const data = {email, password}
    fetch(`${API}users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      } 
    })
    .then(response => {
      // console.log(response)
      if(response.status === 400){
        setIsErr(true)
        throw new Error('Invalid Credentials')
      }
      return response.json()
    }).then(result => {
      setIsErr(false)
      // console.log('Success: ', result)
      localStorage.setItem('jwt', result.token)
      navigate('/Items')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return ( 
    <div className="login-form">
      <div className="split left">
        <div className="centered">
          <p>Price Tracker</p>
        </div>
      </div>
      <div className="vl"></div>
      <div className="split right">
        <div className="centered">
          <div className="form">
            <form onSubmit={loginSubmit}>
              {isErr && <p>Invalid Credentials</p>}
              <label htmlFor="email">Email</label>
              <input type="text" 
                value={email} 
                onChange= {(e) => setEmail(e.target.value)}
                placeholder="Enter ID" 
                required 
              />

              <label htmlFor="psw">Password</label>
              <input type="password" 
                value={password} 
                onChange ={(e)=> setPassword(e.target.value)}
                placeholder="Enter Password" 
                required 
              />

              <button className = "Button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Login;