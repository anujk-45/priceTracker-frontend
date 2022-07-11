import {Link} from "react-router-dom";

const Home = () => {
  return ( 
    <div className="home">
      <div className="split left">
        <div className="centered">
          <p>Price Tracker</p>
        </div>
      </div>
      <div className="vl"></div>
      <div className="split right">
        <div className="centered">
          <Link to="/Login">Log In</Link>
          <Link to="/Signup">Sign Up</Link>
        </div>
      </div>
    </div>
   );
}
 
export default Home;