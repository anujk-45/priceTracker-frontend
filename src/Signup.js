import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:8000/';
  const [isErr, setIsErr] = useState(false)
  const navigate = useNavigate();
  const signupSubmit = async (e)=> {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('psw').value

    const data = {email, password}
    
    fetch(`${API}users/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      } 
    })
    .then(response => {
      console.log(response)
      if(response.status === 400){
        setIsErr(true)
        throw new Error('Invalid Credentials')
      }
      return response.json()
    }).then(result => {
      setIsErr(false)
      // console.log('Success: ', result)
      alert('Account created! Please Login')
      navigate('/Login')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return ( 
    <div className="signup-form">
      <div className="split left">
        <div className="centered">
          <p>Price Tracker</p>
        </div>
      </div>
      <div className="vl"></div>
      <div className="split right">
        <div className="centered"> 
          <div className="form"> 
            <form>
              {isErr && <p>Invalid Credentials</p>}
              <label htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Enter ID" required />

              <label htmlFor="psw">Create Password</label>
              <input type="password" id="psw" placeholder="Enter Password" required />

              <button type="submit" onClick={signupSubmit}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Signup;