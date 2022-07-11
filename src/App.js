import Items from "./Items"
import Home from "./Home";
import Login from "./Login"
import Signup from "./Signup"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
        <Routes>
            <Route path="/" element ={ <Home />} />
            <Route path="/Items" element = { <Items /> } />
            <Route path="/Login" element = { <Login /> } />
            <Route path="/Signup" element = { <Signup /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
