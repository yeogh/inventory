import React, {useState, useEffect} from "react";
import callApi from "./callApi";
import { Route, Routes,  Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPdt from "./components/SearchPdt";
import NavBar from "./components/NavBar";


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
    <div className="container">
      <main>
       <NavBar/>
        <Routes>
          <Route path="/login" element={ !isAuthenticated? <Login setAuth={setAuth} />: <Navigate replace to="/search" />}/>
          <Route path="/register" element={ !isAuthenticated? <Register setAuth={setAuth} /> : <Navigate replace to="/login" />}/>
          <Route path="/search" element={ isAuthenticated? <SearchPdt setAuth={setAuth} /> : <Navigate replace to='/login'/>}/>
        </Routes>
      </main>
    </div>    
    </>
  );
}

export default App;
